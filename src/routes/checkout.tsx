import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { productMap } from "@/data/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Wear The Eras" }] }),
  component: CheckoutPage,
});

const STEPS = ["CONTACT", "SHIPPING", "PAYMENT"];

function CheckoutPage() {
  const cart = useStore((s) => s.cart);
  const clearCart = useStore((s) => s.clearCart);
  const hasStartedCheckout = useStore((s) => s.hasStartedCheckout);
  const setOrderPlaced = useStore((s) => s.setOrderPlaced);

  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
  email: "",
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
});

const [errors, setErrors] = useState<Record<string, string>>({});
  // Prevent direct URL access
  useEffect(() => {
    if (cart.length === 0 || !hasStartedCheckout) {
      navigate({ to: "/cart" });
    }
  }, [cart, hasStartedCheckout, navigate]);

  const subtotal = cart.reduce(
    (sum, l) => sum + (productMap[l.productId]?.price ?? 0) * l.qty,
    0,
  );

  const total = subtotal + (subtotal > 100 || subtotal === 0 ? 0 : 8);

  const validateContact = () => {
  const newErrors: Record<string, string> = {};

  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
  ) {
    newErrors.email = "Enter a valid email";
  }

  if (!form.fullName.trim()) {
    newErrors.fullName = "Full name is required";
  } else if (form.fullName.trim().length < 3) {
    newErrors.fullName = "Name must contain at least 3 characters";
  }

  if (!form.phone.trim()) {
    newErrors.phone = "Phone number is required";
  } else if (!/^[0-9]{10}$/.test(form.phone)) {
    newErrors.phone = "Enter a valid 10-digit phone number";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const validateShipping = () => {
  const newErrors: Record<string, string> = {};

  if (!form.address.trim())
    newErrors.address = "Address is required";

  if (!form.city.trim())
    newErrors.city = "City is required";

  if (!form.state.trim())
    newErrors.state = "State is required";

  if (!form.country.trim())
    newErrors.country = "Country is required";

  if (!form.postalCode.trim()) {
    newErrors.postalCode = "Postal code is required";
  } else if (!/^[0-9]{5,6}$/.test(form.postalCode)) {
    newErrors.postalCode = "Enter a valid postal code";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const validatePayment = () => {
  const newErrors: Record<string, string> = {};

  if (!/^[0-9]{16}$/.test(form.cardNumber.replace(/\s/g, ""))) {
    newErrors.cardNumber = "Card number must contain 16 digits";
  }

  if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(form.expiry)) {
    newErrors.expiry = "Use MM/YY";
  }

  if (!/^[0-9]{3,4}$/.test(form.cvc)) {
    newErrors.cvc = "Invalid CVC";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const submit = (e: React.FormEvent) => {
  e.preventDefault();

  if (step === 0) {
    if (!validateContact()) return;
    setStep(1);
    return;
  }

  if (step === 1) {
    if (!validateShipping()) return;
    setStep(2);
    return;
  }

  if (!validatePayment()) return;

  setOrderPlaced(true);
  clearCart();

  navigate({
    to: "/order-confirmed",
  });
};

  return (
    <div className="min-h-screen bg-black px-6 pt-32 pb-24 text-white md:px-10">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="flex gap-6 text-[11px] tracked-tight">
            {STEPS.map((s, i) => (
              <span
                key={s}
                style={{
                  opacity: i === step ? 1 : 0.4,
                  color: i === step ? "#fbbf24" : "white",
                }}
              >
                {i + 1}. {s}
              </span>
            ))}
          </div>

          <h1 className="mt-6 font-display text-5xl">
            {STEPS[step]}
          </h1>

          <form onSubmit={submit} className="mt-10 space-y-5">
  {step === 0 && (
    <>
      <Field
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        error={errors.email}
      />

      <Field
        label="Full name"
        value={form.fullName}
        onChange={(e) =>
          setForm({ ...form, fullName: e.target.value })
        }
        error={errors.fullName}
      />

      <Field
        label="Phone Number"
        type="tel"
        placeholder="9876543210"
        value={form.phone}
        onChange={(e) =>
          setForm({
            ...form,
            phone: e.target.value.replace(/\D/g, ""),
          })
        }
        error={errors.phone}
      />
    </>
  )}

  {step === 1 && (
    <>
      <Field
        label="Address"
        value={form.address}
        onChange={(e) =>
          setForm({ ...form, address: e.target.value })
        }
        error={errors.address}
      />

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="City"
          value={form.city}
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
          error={errors.city}
        />

        <Field
          label="State"
          value={form.state}
          onChange={(e) =>
            setForm({ ...form, state: e.target.value })
          }
          error={errors.state}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Postal Code"
          value={form.postalCode}
          onChange={(e) =>
            setForm({
              ...form,
              postalCode: e.target.value.replace(/\D/g, ""),
            })
          }
          error={errors.postalCode}
        />

        <Field
          label="Country"
          value={form.country}
          onChange={(e) =>
            setForm({ ...form, country: e.target.value })
          }
          error={errors.country}
        />
      </div>
    </>
  )}

  {step === 2 && (
    <>
      <Field
        label="Card Number"
        placeholder="1234 5678 9012 3456"
        value={form.cardNumber}
        onChange={(e) =>
          setForm({
            ...form,
            cardNumber: e.target.value,
          })
        }
        error={errors.cardNumber}
      />

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Expiry"
          placeholder="MM/YY"
          value={form.expiry}
          onChange={(e) =>
            setForm({
              ...form,
              expiry: e.target.value,
            })
          }
          error={errors.expiry}
        />

        <Field
          label="CVC"
          placeholder="123"
          value={form.cvc}
          onChange={(e) =>
            setForm({
              ...form,
              cvc: e.target.value.replace(/\D/g, ""),
            })
          }
          error={errors.cvc}
        />
      </div>
    </>
  )}

  <button
    type="submit"
    className="mt-6 w-full bg-white py-4 text-[12px] tracked-tight text-black transition hover:bg-white/90"
  >
    {step < 2 ? "CONTINUE →" : "COMPLETE ORDER"}
  </button>
</form>
        </div>

        <aside className="h-fit border border-white/10 p-8">
          <p className="text-[11px] tracked-tight opacity-60">
            ORDER
          </p>

          <ul className="mt-4 space-y-3 text-sm">
            {cart.map((l) => {
              const p = productMap[l.productId];

              if (!p) return null;

              return (
                <li
                  key={`${l.productId}-${l.size}`}
                  className="flex justify-between gap-3"
                >
                  <span className="opacity-80">
                    {p.name}
                    <span className="opacity-50">
                      {" "}
                      · {l.size} × {l.qty}
                    </span>
                  </span>

                  <span>${p.price * l.qty}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex items-baseline justify-between border-t border-white/10 pt-4">
            <span className="tracked-tight text-[11px]">
              TOTAL
            </span>

            <span className="font-display text-2xl">
              ${total}
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  ...rest
}: {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[11px] tracked-tight opacity-70">
        {label}
      </span>

      <input
        {...rest}
        className={`mt-2 w-full rounded border bg-transparent px-4 py-3 text-sm transition focus:outline-none ${
          error
            ? "border-red-500"
            : "border-white/15 focus:border-white focus:ring-1 focus:ring-white/40"
        }`}
      />

      {error && (
        <p className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </label>
  );
}