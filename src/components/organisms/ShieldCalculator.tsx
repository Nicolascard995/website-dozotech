"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { submitShieldCalculatorLead } from "@/actions/leads";

export default function ShieldCalculator() {
 const t = useTranslations("ShieldCalculator");
 const [step, setStep] = useState<"input" | "result" | "email">("input");
 const [formData, setFormData] = useState({
 name: "",
 city: "",
 ticket: "",
 noshows: "",
 email: "",
 });
 const [annualLoss, setAnnualLoss] = useState<number | null>(null);

 const handleCalculate = (e: React.FormEvent) => {
 e.preventDefault();
 const ticket = parseFloat(formData.ticket);
 const noshows = parseFloat(formData.noshows);
 if (!isNaN(ticket) && !isNaN(noshows)) {
 const loss = ticket * noshows * 52;
 setAnnualLoss(loss);
 setStep("result");
 }
 };

 const [loading, setLoading] = useState(false);

 const handleEmailSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoading(true);

 const result = await submitShieldCalculatorLead({
 ...formData,
 annualLoss
 });

 setLoading(false);

 if (result.success) {
 alert(t("success_message")); // Temporary feedback
 setStep("input"); // Reset for demo
 setFormData({ ...formData, email: "" });
 } else {
 alert(t("error_prefix") + (result.error || t("default_error")));
 }
 };

 const [currency, setCurrency] = useState<"EUR" | "USD">("EUR");

 const formatCurrency = (value: number) => {
 return new Intl.NumberFormat(currency === "EUR" ? "de-DE" : "en-US", {
 style: "currency",
 currency: currency,
 maximumFractionDigits: 0,
 }).format(value);
 };

 return (
 <div className="w-full max-w-md mx-auto bg-cream-dark border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden group">
 {/* Glow Effect */}
 <div className="absolute top-0 right-0 w-64 h-64 bg-ink/5 rounded-full blur-[100px] pointer-events-none" />

 {/* Currency Toggle */}
 <div className="absolute top-4 right-4 z-20 flex bg-white/5 rounded-lg p-1 border border-white/10">
 <button
 onClick={() => setCurrency("EUR")}
 className={`px-2 py-1 rounded-md text-xs font-bold transition-colors ${currency === "EUR" ? "bg-ink text-ink" : "text-white/40 hover:text-white"}`}
 >
 EUR
 </button>
 <button
 onClick={() => setCurrency("USD")}
 className={`px-2 py-1 rounded-md text-xs font-bold transition-colors ${currency === "USD" ? "bg-ink text-ink" : "text-white/40 hover:text-white"}`}
 >
 USD
 </button>
 </div>

 <div className="relative z-10">
 <AnimatePresence mode="wait">
 {step === "input" && (
 <motion.form
 key="input"
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: 20 }}
 onSubmit={handleCalculate}
 className="space-y-4"
 >
 <h3 className="text-xl font-bold text-white mb-2 font-syne">
 {t("title_input")}
 </h3>

 <div className="space-y-3">
 <input
 type="text"
 placeholder={t("label_name")}
 className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-ember focus:outline-none transition-colors"
 value={formData.name}
 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
 />
 <input
 type="text"
 placeholder={t("label_city")}
 className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-ember focus:outline-none transition-colors"
 value={formData.city}
 onChange={(e) => setFormData({ ...formData, city: e.target.value })}
 />
 <div className="grid grid-cols-2 gap-3">
 <input
 type="number"
 placeholder={`${t("label_ticket")} (${currency === "EUR" ? "€" : "$"})`}
 className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-ember focus:outline-none transition-colors"
 value={formData.ticket}
 onChange={(e) => setFormData({ ...formData, ticket: e.target.value })}
 required
 />
 <input
 type="number"
 placeholder={t("label_noshows")}
 className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-ember focus:outline-none transition-colors"
 value={formData.noshows}
 onChange={(e) => setFormData({ ...formData, noshows: e.target.value })}
 required
 />
 </div>
 </div>

 <button
 type="submit"
 className="w-full bg-ink text-ink font-bold py-3 rounded-lg hover:bg-ink/90 transition-all uppercase tracking-wide mt-4"
 >
 {t("action_calculate")}
 </button>
 </motion.form>
 )}

 {step === "result" && annualLoss !== null && (
 <motion.div
 key="result"
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.95 }}
 className="text-center space-y-6"
 >
 <div className="space-y-2">
 <p className="text-white/60 text-sm">{t("result_prefix")}</p>
 <div className="text-4xl md:text-5xl font-bold text-red-500 font-syne tabular-nums">
 {formatCurrency(annualLoss)}
 </div>
 <p className="text-white/60 text-sm">{t("result_suffix")}</p>
 </div>

 <div className="p-4 bg-white/5 rounded-xl border border-white/10">
 <p className="text-ember font-bold mb-1">{t("upgrade_title")}</p>
 <p className="text-white/70 text-sm mb-4">
 {t("upgrade_desc")}
 </p>
 <button
 onClick={() => setStep("email")}
 className="w-full border border-ember text-ember font-bold py-2 rounded-lg hover:bg-ink hover:text-ink transition-all uppercase text-sm"
 >
 {t("action_unlock")}
 </button>
 </div>

 <button
 onClick={() => setStep("input")}
 className="text-xs text-white/40 hover:text-white transition-colors underline"
 >
 {t("action_recalc")}
 </button>
 </motion.div>
 )}

 {step === "email" && (
 <motion.form
 key="email"
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -20 }}
 onSubmit={handleEmailSubmit}
 className="space-y-4"
 >
 <h3 className="text-lg font-bold text-white mb-2">
 {t("email_title")}
 </h3>
 <p className="text-white/60 text-sm mb-4">
 {t("email_desc")}
 </p>

 <input
 type="email"
 placeholder={t("email_placeholder")}
 className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-ember focus:outline-none transition-colors"
 value={formData.email}
 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
 required
 />

 <button
 type="submit"
 disabled={loading}
 className="w-full bg-ember text-ink font-bold py-3 rounded-lg hover:bg-ember/90 transition-all uppercase tracking-wide mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {loading ? t("action_sending") : t("action_send_me")}
 </button>

 <button
 type="button"
 onClick={() => setStep("result")}
 className="w-full text-center text-xs text-white/40 hover:text-white transition-colors mt-2"
 >
 {t("action_back")}
 </button>
 </motion.form>
 )}
 </AnimatePresence>
 </div>
 </div>
 );
}
