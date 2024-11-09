import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInvoiceByAppointmentId } from '../services/api';
import Invoice from '../components/Invoice'; // Normal import for the component
import type { InvoiceModel } from '../types'; // Type-only import

const GenerateInvoicePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<InvoiceModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        console.log(id);
        const fetchedInvoice = await getInvoiceByAppointmentId(id!);
        setInvoice(fetchedInvoice);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  if (loading) {
    return <p>Loading invoice...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className='mt-[200px]'>
      {invoice && <Invoice invoice={invoice} />}
    </div>
  );
};

export default GenerateInvoicePage;
