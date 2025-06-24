"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { getFlightOptions } from "../exerciseUtils";

interface FlightOption {
  id: string;
  airline: string;
  price: number;
  duration: string;
}

interface FlightData {
  destination: string;
  departure: string;
  arrival: string;
  passengers: number;
  isRoundTrip: boolean;
  selectedFlightId: string | null;
}

type FlightState = FlightData &
  (
    | {
        status: "idle";
      }
    | {
        status: "submitting";
        selectedFlightId: null;
      }
    | {
        status: "error";
      }
    | {
        status: "success";
        flights: FlightOption[];
      }
  );

function FlightBooking() {
  const [flightState, setFlightState] = useState<FlightState>({
    status: "idle",
    destination: "",
    departure: "",
    arrival: "",
    passengers: 1,
    isRoundTrip: false,
    selectedFlightId: null,
  });

  const selectedFlight =
    flightState.status === "success" && flightState.selectedFlightId
      ? flightState.flights.find((f) => f.id === flightState.selectedFlightId)
      : null;
  const totalPrice = selectedFlight
    ? selectedFlight.price * flightState.passengers
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFlightState((prev) => ({
      ...prev,
      status: "submitting",
      selectedFlightId: null,
    }));

    try {
      const flights = await getFlightOptions(flightState);
      setFlightState((prev) => ({ ...prev, status: "success", flights }));
    } catch (error) {
      setFlightState((prev) => ({ ...prev, status: "error" }));
    }
  };

  const handleFlightSelect = (flight: FlightOption) => {
    setFlightState((prev) =>
      prev.status === "success"
        ? {
            ...prev,
            selectedFlightId: flight.id,
          }
        : prev
    );
  };

  return (
    <div className="w-full max-w-2xl">
      <h1>Flight Bookink</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <Switch
            id="roadtrip"
            checked={flightState.isRoundTrip}
            onCheckedChange={(checked) =>
              setFlightState((prev) => ({
                ...prev,
                isRoundTrip: checked,
              }))
            }
          />
          <Label htmlFor="roadtrip">Round Trip</Label>
        </div>

        <div>
          <Label htmlFor="destination">Destination</Label>
          <Input
            type="text"
            id="destination"
            value={flightState.destination}
            onChange={(e) =>
              setFlightState((prev) => ({
                ...prev,
                destination: e.target.value,
              }))
            }
            required
          />
        </div>
      </form>
    </div>
  );
}
