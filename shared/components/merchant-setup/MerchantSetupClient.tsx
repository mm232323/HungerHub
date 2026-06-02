"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/react";
import { useRouter } from "next/navigation";
import { customFetch } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { useInitMerchantStore } from "@/hooks/use-init-merchant-store";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, ArrowRight, ArrowLeft, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

import { FormData } from "./types";
import { INITIAL_FORM, STEPS } from "./constants";
import { StepDots } from "./StepDots";
import { LeftPanel } from "./LeftPanel";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepFour } from "./StepFour";

import { useQueryClient } from "@tanstack/react-query";

export function MerchantSetupClient() {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const hasInitiated = useRef(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  useEffect(() => {
    if (!user || hasInitiated.current) return;
    hasInitiated.current = true;
    user.update({ unsafeMetadata: { role: "merchant" } })
      .then(() => customFetch("/users/init", { method: "POST" }))
      .catch((e) => console.error("Failed to init user", e));
  }, [user]);

  const mutation = useInitMerchantStore({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Store created!",
          description: "Welcome to FoodHub. Let's start cooking.",
        });
        queryClient.invalidateQueries({ queryKey: ["/dashboard/merchant"] });
        router.push("/dashboard");
      },
      onError: () => {
        toast({
          title: "Something went wrong",
          description: "Please try again.",
          variant: "destructive",
        });
      },
    },
  });

  const set = (key: keyof FormData, value: FormData[typeof key]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleTag = (tag: string) => {
    set(
      "tags",
      form.tags.includes(tag)
        ? form.tags.filter((t) => t !== tag)
        : [...form.tags, tag].slice(0, 5),
    );
  };

  const validate = (s: number): boolean => {
    const errs: typeof errors = {};
    if (s === 1) {
      if (!form.name.trim()) errs.name = "Restaurant name is required";
      if (form.name.trim().length < 3)
        errs.name = "Name must be at least 3 characters";
      if (!form.bio.trim()) errs.bio = "Tell us about your restaurant";
    }
    if (s === 2) {
      if (!form.cuisineType) errs.cuisineType = "Pick a cuisine type";
    }
    if (s === 3) {
      if (!form.address.trim()) errs.address = "Address is required";
      if (!form.deliveryFee || isNaN(Number(form.deliveryFee)))
        errs.deliveryFee = "Enter a valid delivery fee";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submit = () => {
    if (!validate(step)) return;
    mutation.mutate({
      data: {
        name: form.name.trim(),
        bio: form.bio.trim(),
        cuisineType: form.cuisineType,
        deliveryTime: form.deliveryTime,
        deliveryFee: Number(form.deliveryFee),
        address: form.address.trim(),
        isOpen: form.isOpen,
        profileImage: form.profileImage.trim() || undefined,
        coverImage: form.coverImage.trim() || undefined,
        tags: form.tags,
        ownerUserName: user?.username || undefined,
      },
    });
  };

  const currentStep = STEPS[step - 1];
  const StepIcon = currentStep.icon;

  return (
    <div className="min-h-[100dvh] bg-stone-50 flex">
      <LeftPanel step={step} />

      <div className="flex-1 flex flex-col min-h-[100dvh]">
        <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b bg-white">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <Utensils className="h-4 w-4 text-white" />
            </div>
            <span className="font-black text-stone-900">FoodHub</span>
          </div>
          <StepDots current={step} total={STEPS.length} />
        </div>

        <div className="flex-1 flex flex-col justify-center px-5 py-8 lg:px-16 max-w-2xl mx-auto w-full">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-600 rounded-full px-3 py-1.5 mb-4">
              <StepIcon className="h-3.5 w-3.5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Step {step} of {STEPS.length}
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-stone-900 mb-1">
              {currentStep.title}
            </h2>
            <p className="text-stone-400 text-sm">{currentStep.description}</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }}
              className="space-y-5"
            >
              {step === 1 && <StepOne form={form} set={set} errors={errors} />}
              {step === 2 && <StepTwo form={form} set={set} errors={errors} toggleTag={toggleTag} />}
              {step === 3 && <StepThree form={form} set={set} errors={errors} />}
              {step === 4 && <StepFour form={form} set={set} />}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-100">
            <div className="hidden lg:block">
              <StepDots current={step} total={STEPS.length} />
            </div>

            <div className="flex gap-3 ml-auto">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={back}
                  className="h-12 px-6 rounded-xl border-stone-200"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}

              {step < STEPS.length ? (
                <Button
                  onClick={next}
                  className="h-12 px-8 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/20"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={submit}
                  disabled={mutation.isPending}
                  className="h-12 px-8 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/20"
                >
                  {mutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating your store…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Flame className="h-4 w-4" />
                      Launch My Store
                    </span>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
