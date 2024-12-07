import { motion } from "framer-motion";
import { format } from "date-fns";
import { Item } from "../types";

interface ReceiptPreviewProps {
  customerName: string;
  customerEmail: string;
  items: Item[];
  currency: string;
  notes: string;
  templateId: string | null;
}

const currencySymbols: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
  CHF: "CHF",
  CNY: "¥",
  INR: "₹",
  SGD: "S$",
};

export function ReceiptPreview({
  customerName,
  customerEmail,
  items,
  currency,
  notes,
  templateId,
}: ReceiptPreviewProps) {
  const currencySymbol = currencySymbols[currency] || currency;

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const calculateTax = () => {
    return items.reduce((sum, item) => {
      const itemTotal = item.quantity * item.price;
      return sum + (itemTotal * item.tax) / 100;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 min-h-full"
    >
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold">Receipt</h2>
        <p className="text-gray-500 text-sm">
          Date: {format(new Date(), "MMMM dd, yyyy")}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Customer Details</h3>
        <p>{customerName}</p>
        {customerEmail && <p className="text-gray-600">{customerEmail}</p>}
      </div>

      <div className="mt-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Description</th>
              <th className="text-right py-2">Qty</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Tax</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const itemTotal = item.quantity * item.price;
              const itemTax = (itemTotal * item.tax) / 100;
              return (
                <tr key={index} className="border-b">
                  <td className="py-2">{item.description || "---"}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">
                    {currencySymbol}
                    {item.price.toFixed(2)}
                  </td>
                  <td className="text-right">{item.tax}%</td>
                  <td className="text-right">
                    {currencySymbol}
                    {(itemTotal + itemTax).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col items-end">
        <div className="w-48">
          <div className="flex justify-between py-1">
            <span>Subtotal:</span>
            <span>
              {currencySymbol}
              {calculateSubtotal().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span>Tax:</span>
            <span>
              {currencySymbol}
              {calculateTax().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-1 font-bold border-t">
            <span>Total:</span>
            <span>
              {currencySymbol}
              {calculateTotal().toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {notes && (
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold">Notes</h3>
          <p className="text-gray-600">{notes}</p>
        </div>
      )}
    </motion.div>
  );
} 