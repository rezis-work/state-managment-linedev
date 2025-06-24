"use server";

import { z } from "zod";

const travelDataSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  birthDate: z
    .string()
    .min(1, "Birth date is required")
    .refine((date) => {
      const birthDay = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDay.getFullYear();
      return age >= 18 && age <= 120;
    }, "Age must be between 18 and 120 years"),
  passport: z
    .string()
    .min(1, "Passport is required")
    .regex(
      /^[A-Z0-9]{9}$/,
      "Passport must be 9 characters long and contain only uppercase letters and numbers"
    ),
  originCity: z.string().min(1, "Origin city is required"),
  seatPreference: z.enum(["window", "aisle", "middle"], {
    errorMap: () => ({ message: "plsease select a valid seat prefrerence" }),
  }),
});

export type TravelData = z.infer<typeof travelDataSchema>;

export type FormState = {
  status: "idle" | "pending" | "success" | "error";
  errors: Record<string, string>;
  data: TravelData | null;
  submittedData?: {
    firstName: string;
    lastName: string;
    birthDate: string;
    passport: string;
    originCity: string;
    seatPreference: string;
  };
};

async function saveTravelDataToAPI(
  data: TravelData
): Promise<{ success: boolean; id?: string; error?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (Math.random() < 0.1) {
    return {
      success: false,
      error: "Failed to save data. Please try again.",
    };
  }

  const mockId = `TRV_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 15)}`;

  console.log("Saving data to API:", data);

  return { success: true, id: mockId };
}

export async function submitTravelData(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const rawData = {
      firstName: (formData.get("firstName") as string) || "",
      lastName: (formData.get("lastName") as string) || "",
      birthDate: (formData.get("birthDate") as string) || "",
      passport: (formData.get("passport") as string) || "",
      originCity: (formData.get("originCity") as string) || "",
      seatPreference: (formData.get("seatPreference") as string) || "",
    };

    const result = travelDataSchema.safeParse(rawData);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          errors[error.path[0]] = error.message;
        }
      });
      return {
        status: "error",
        errors,
        data: null,
        submittedData: rawData,
      };
    }

    const apiResult = await saveTravelDataToAPI(result.data);

    if (!apiResult.success) {
      return {
        status: "error",
        errors: { general: apiResult.error || "Failed to save travel data" },
        data: null,
        submittedData: rawData,
      };
    }

    return {
      status: "success",
      errors: {},
      data: result.data,
      submittedData: rawData,
    };
  } catch (error) {
    console.error("Error submitting travel data:", error);

    return {
      status: "error",
      errors: { general: "An unexpected error occurred. Please try again." },
      data: null,
      submittedData: undefined,
    };
  }
}
