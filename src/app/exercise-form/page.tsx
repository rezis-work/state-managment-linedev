"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/combobox";
import { locations } from "@/app/locations";
import { FormState, submitTravelData } from "./action";
import { CheckCircle } from "lucide-react";

const seatPrefrences = [
  {
    value: "window",
    label: "Window",
  },
  {
    value: "aisle",
    label: "Aisle",
  },
  {
    value: "middle",
    label: "Middle",
  },
];

const initialState: FormState = {
  status: "idle",
  errors: {},
  data: null,
};

export default function TravelFormPage() {
  const [state, submitAction, isPending] = React.useActionState(
    submitTravelData,
    initialState
  );

  const isSuccess = state.status === "success";
  const errors = state.errors;
  const successData = state.data;

  if (isSuccess && successData) {
    return (
      <div>
        form submitted successfully{" "}
        <span>
          <CheckCircle />
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full mx-auto min-h-screen p-6">
      <Card>
        <CardHeader>
          <CardTitle>Travel INformation form</CardTitle>
          <CardDescription>
            Please fill out the form below to submit your travel information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={submitAction} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firtName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  disabled={isPending}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firtName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  disabled={isPending}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.firstName}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthdate">Birth Date *</Label>
              <Input
                id="birthdate"
                name="birthdate"
                type="date"
                aria-invalid={errors.birthdate ? "true" : "false"}
                disabled={isPending}
              />
              {errors.birthdate && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.birthdate}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="passport">Passport *</Label>
              <Input
                id="passport"
                name="passport"
                type="text"
                placeholder="Enter your passport number"
                aria-invalid={errors.passport ? "true" : "false"}
                disabled={isPending}
              />
              {errors.passport && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.passport}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="originCity">Origin City *</Label>
              <Combobox
                id="originCity"
                name="originCity"
                options={locations}
                placeholder="Select your origin city"
              />
              {errors.originCity && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.originCity}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="seatPreference">Seat Preference *</Label>
              <Combobox
                id="seatPreference"
                name="seatPreference"
                options={seatPrefrences}
                placeholder="Select your seat preference"
              />
              {errors.seatPreference && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.seatPreference}
                </p>
              )}
            </div>

            {errors.general && (
              <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.general}
                </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
