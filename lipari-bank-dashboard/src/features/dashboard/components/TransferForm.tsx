import { useForm } from "react-hook-form";

interface TransferFormValues {
  amount: number;
  iban: string;
  causale: string;
}

export function TransferForm() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<TransferFormValues>({ mode: 'onChange' });

  const onSubmit = (data: TransferFormValues) => {
    console.log('Bonifico:', data);
    alert(`Bonifico di ${data.amount}€ a ${data.iban}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        step="0.01"
        placeholder="Importo €"
        {...register('amount', {
          required: true,
          min: { value: 0.01, message: 'Importo > 0' },
          valueAsNumber: true
        })}
      />
      {errors.amount && <span>{errors.amount.message}</span>}

      <input
        type="text"
        placeholder="IBAN destinatario"
        {...register('iban', {
          required: true,
          pattern: { value: /^IT\d{25}$/, message: 'IBAN non valido (IT + 25 cifre)' }
        })}
      />
      {errors.iban && <span>{errors.iban.message}</span>}

      <textarea
        placeholder="Causale (opzionale)"
        {...register('causale', {
          maxLength: { value: 100, message: 'Max 100 caratteri' }
        })}
      />

      <button type="submit" disabled={!isValid}>Invia bonifico</button>
    </form>
  );
}