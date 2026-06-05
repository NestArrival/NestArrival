const { prisma } = require("../config/db");
const {
  SUBSCRIPTION_PLANS,
  URGENT_MATCH_ADDON,
} = require("../utils/constants");

exports.createSubscription = async (req, res) => {
  try {
    const { planId, type, purchaseUrgentMatch } = req.body;
    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);
    if (!plan) {
      return res
        .status(400)
        .json({ error: "Invalid subscription package selected" });
    }

    const normalizedType = String(type || "SUBSCRIPTION").toUpperCase();
    const isSubscription = normalizedType === "SUBSCRIPTION";
    if (!["SUBSCRIPTION", "ONE_TIME"].includes(normalizedType)) {
      return res.status(400).json({ error: "Invalid subscription type" });
    }

    const purchaseUrgent =
      purchaseUrgentMatch === true || purchaseUrgentMatch === "true";
    let finalPrice = isSubscription ? plan.priceSub : plan.priceOneTime;
    if (purchaseUrgent) {
      finalPrice += URGENT_MATCH_ADDON.price;
    }

    const startDate = new Date();
    const endDate = new Date(
      Date.now() + plan.durationDays * 24 * 60 * 60 * 1000,
    );

    // TODO: Integrate payment gateway here before transaction
    // 1. Call payment API (Stripe, PayPal, etc.)
    // 2. Validate payment status
    // 3. Handle payment failures gracefully
    // Only proceed if payment is confirmed
    // const paymentResult = await processPayment({
    //   userId: req.user.id,
    //   amount: finalPrice,
    //   planId: plan.id,
    // });
    // if (!paymentResult.success) {
    //   return res.status(402).json({ error: "Payment failed" });
    // }

    await prisma.$transaction(async (tx) => {
      // Prevent duplicate submissions within last 10 seconds
      const recentSub = await tx.subscription.findFirst({
        where: {
          userId: req.user.id,
          planId: plan.id,
          createdAt: { gte: new Date(Date.now() - 10000) },
        },
      });
      if (recentSub) {
        throw new Error("DUPLICATE_REQUEST");
      }

      await tx.subscription.updateMany({
        where: { userId: req.user.id, isActive: true },
        data: { isActive: false },
      });

      await tx.subscription.create({
        data: {
          userId: req.user.id,
          planId: plan.id,
          name: plan.name,
          price: finalPrice,
          durationDays: plan.durationDays,
          isSubscription,
          approachesAllowed: plan.approachesLimit,
          startDate,
          endDate,
          isActive: true,
        },
      });

      if (purchaseUrgent) {
        await tx.user.update({
          where: { id: req.user.id },
          data: { isUrgentMatch: true, urgentMatchRequestedAt: new Date() },
        });
      }
    });

    res.json({ message: `Successfully purchased ${plan.name}!` });
  } catch (err) {
    if (err.message === "DUPLICATE_REQUEST") {
      return res.status(409).json({
        error:
          "Subscription request already submitted. Please wait and try again.",
      });
    }
    console.error("Subscription creation failed:", err);
    res.status(500).json({
      error: "Unable to process subscription. Please try again.",
    });
  }
};

exports.getSubscriptions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const skip = (page - 1) * limit;
    const list = await prisma.subscription.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });
    const total = await prisma.subscription.count({
      where: { userId: req.user.id },
    });
    res.json({ subscriptions: list, page, limit, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createRefundRequest = async (req, res) => {
  try {
    const { subscriptionId, reason } = req.body;
    if (!subscriptionId || !reason) {
      return res.status(400).json({
        error: "Subscription ID and refund reason are required",
      });
    }

    // Validate reason field
    const trimmedReason = String(reason).trim();
    if (!trimmedReason || trimmedReason.length > 500) {
      return res.status(400).json({
        error: "Reason must be between 1 and 500 characters",
      });
    }

    const sub = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
    });
    if (!sub || sub.userId !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // Validate subscription is active
    if (!sub.isActive) {
      return res.status(400).json({
        error: "Cannot refund inactive subscription",
      });
    }

    // Enforce 7-day refund window from purchase
    const daysSincePurchase =
      (Date.now() - new Date(sub.startDate).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSincePurchase > 7) {
      return res.status(400).json({
        error: "Refund window has expired (7 days from purchase date)",
      });
    }

    // Check for duplicate refund request
    const duplicate = await prisma.refundRequest.findFirst({
      where: { subscriptionId },
    });
    if (duplicate) {
      return res.status(400).json({
        error: "Refund claim already filed for this subscription",
      });
    }

    await prisma.refundRequest.create({
      data: {
        userId: req.user.id,
        subscriptionId,
        reason: trimmedReason,
        status: "PENDING",
      },
    });

    res.json({ message: "Refund application submitted to auditing queue." });
  } catch (err) {
    console.error("Refund request error:", err);
    res.status(500).json({
      error: "Unable to submit refund request. Please try again.",
    });
  }
};
