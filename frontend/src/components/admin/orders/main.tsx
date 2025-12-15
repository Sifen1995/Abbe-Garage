import { useState } from "react";
import { type Customer } from "../../../types/customer";
import { type Vehicle } from "../../../types/vehicle";
import AddOrderOne from "./addOrdersOne";
import AddOrderTow from "./addOrdersTow";
import AddOrderThree from "./addOrderThree";

type Step = "customer" | "vehicle" | "details";

const OrdersMain = () => {
  const [step, setStep] = useState<Step>("customer");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSelectedVehicle(null);
    setStep("vehicle");
  };

  const handleBack = () => {
    setSelectedCustomer(null);
    setSelectedVehicle(null);
    setStep("customer");
  };

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setStep("details");
  };

  const handleDeselectCustomer = () => {
    setSelectedCustomer(null);
    setSelectedVehicle(null);
    setStep("customer");
  };

  const handleDeselectVehicle = () => {
    setSelectedVehicle(null);
    setStep("vehicle");
  };

  if (step === "details" && selectedCustomer && selectedVehicle) {
    return (
      <AddOrderThree
        customer={selectedCustomer}
        vehicle={selectedVehicle}
        onBack={handleBack}
        onDeselectCustomer={handleDeselectCustomer}
        onDeselectVehicle={handleDeselectVehicle}
      />
    );
  }

  if (step === "vehicle" && selectedCustomer) {
    return (
      <AddOrderTow
        customer={selectedCustomer}
        onBack={handleBack}
        onSelectVehicle={handleSelectVehicle}
      />
    );
  }

  return <AddOrderOne onCustomerSelect={handleSelectCustomer} />;
};

export default OrdersMain;

