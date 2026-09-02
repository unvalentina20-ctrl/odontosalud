import React, { useState } from 'react';
import { TREATMENTS } from '../data/dentalData';
import { Treatment } from '../types';
import { Calculator, Plus, Minus, CreditCard, Sparkles, CheckCircle2, Calendar, ArrowRight, DollarSign } from 'lucide-react';

interface SelectedItem {
  treatment: Treatment;
  quantity: number;
}

interface PriceCalculatorProps {
  onOpenBookingWithBudget: (summaryNote: string) => void;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  onOpenBookingWithBudget
}) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([
    { treatment: TREATMENTS[0], quantity: 1 }, // Default Limpieza
  ]);
  const [installments, setInstallments] = useState<1 | 3 | 6 | 12>(3);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');

  const toggleTreatment = (treatment: Treatment) => {
    const exists = selectedItems.find(i => i.treatment.id === treatment.id);
    if (exists) {
      setSelectedItems(selectedItems.filter(i => i.treatment.id !== treatment.id));
    } else {
      setSelectedItems([...selectedItems, { treatment, quantity: 1 }]);
    }
  };

  const updateQuantity = (treatmentId: string, delta: number) => {
    setSelectedItems(selectedItems.map(item => {
      if (item.treatment.id === treatmentId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  // Calculate totals
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.treatment.estimatedPrice * item.quantity, 
    0
  );

  const discountPercent = paymentMethod === 'cash' ? 15 : 0;
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = subtotal - discountAmount;
  const monthlyCost = Math.round(finalTotal / (paymentMethod === 'cash' ? 1 : installments));

  const handleBookingWithPlan = () => {
    const listNames = selectedItems.map(i => `${i.quantity}x ${i.treatment.title}`).join(', ');
    const note = `Presupuesto estimado: ${listNames} | Plan: ${paymentMethod === 'cash' ? 'Pago Contado (15% OFF)' : `${installments} cuotas sin interés de $${monthlyCost.toLocaleString('es-AR')}`}`;
    onOpenBookingWithBudget(note);
  };

  return (
    <section id="presupuesto" className="py-12 sm:py-16 bg-gradient-to-b from-white via-teal-50/40 to-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 border border-teal-200 text-teal-800 text-xs font-extrabold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            Calculadora de Presupuesto
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold text-slate-900 tracking-tight">
            Estima tu inversión dental en cuotas transparentes
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Selecciona los tratamientos que deseas realizarte para calcular el valor cuota sin sorpresas ni letra chica.
          </p>
        </div>

        {/* Calculator layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Treatment Selection Grid */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              1. Selecciona los tratamientos:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
              {TREATMENTS.map((t) => {
                const item = selectedItems.find(i => i.treatment.id === t.id);
                const isSelected = !!item;

                return (
                  <div
                    key={t.id}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-teal-50/70 border-teal-500 shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="cursor-pointer" onClick={() => toggleTreatment(t)}>
                        <h4 className="text-xs font-bold text-slate-900">{t.title}</h4>
                        <p className="text-[11px] font-semibold text-teal-700 mt-0.5">
                          ${t.estimatedPrice.toLocaleString('es-AR')}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleTreatment(t)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                          isSelected ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isSelected ? '✓' : '+'}
                      </button>
                    </div>

                    {/* Quantity controls if selected */}
                    {isSelected && (
                      <div className="mt-3 pt-2 border-t border-teal-200/60 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-medium text-slate-600">Cantidad:</span>
                        <div className="flex items-center space-x-2 bg-white rounded-lg border border-teal-300 px-2 py-0.5">
                          <button
                            onClick={() => updateQuantity(t.id, -1)}
                            className="text-slate-600 hover:text-teal-700 font-bold px-1"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-extrabold text-slate-900 px-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(t.id, 1)}
                            className="text-slate-600 hover:text-teal-700 font-bold px-1"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Plan & Summary Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-6">
            
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-teal-300 mb-3">
                2. Elige la forma de pago:
              </h3>

              {/* Toggle cash vs card */}
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Tarjetas (Cuotas)</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'cash'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Contado (15% OFF)</span>
                </button>
              </div>

              {/* Installment count selector if card */}
              {paymentMethod === 'card' && (
                <div className="mt-3">
                  <label className="block text-[11px] text-slate-400 mb-1.5 font-medium">
                    Cuotas fijas sin interés con tarjeta:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[3, 6, 12].map((num) => (
                      <button
                        key={num}
                        onClick={() => setInstallments(num as 1 | 3 | 6 | 12)}
                        className={`py-2 rounded-xl text-xs font-extrabold border transition-all ${
                          installments === num
                            ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {num} Cuotas
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Financial Breakdown */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Subtotal seleccionado ({selectedItems.length} servicios):</span>
                <span className="font-bold text-slate-200">${subtotal.toLocaleString('es-AR')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-xs text-emerald-400 font-bold">
                  <span>Descuento Pago Contado (15%):</span>
                  <span>-${discountAmount.toLocaleString('es-AR')}</span>
                </div>
              )}

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-teal-400 font-extrabold uppercase tracking-widest block">
                  {paymentMethod === 'cash' ? 'Inversión Total Contado:' : `Valor por Cuota (${installments} cuotas sin interés):`}
                </span>
                <div className="text-3xl font-extrabold text-white tracking-tight font-serif">
                  ${monthlyCost.toLocaleString('es-AR')}
                  <span className="text-xs font-medium text-slate-400">
                    {paymentMethod === 'card' ? ' / mes' : ' total'}
                  </span>
                </div>
                {paymentMethod === 'card' && (
                  <p className="text-[10px] text-slate-400 pt-1">
                    Total financiado: ${finalTotal.toLocaleString('es-AR')} en {installments} cuotas fijas.
                  </p>
                )}
              </div>
            </div>

            {/* Booking Trigger */}
            <button
              onClick={handleBookingWithPlan}
              disabled={selectedItems.length === 0}
              className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 disabled:opacity-50 text-slate-950 font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Cita con este Presupuesto</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
