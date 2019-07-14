enum PaymentStatus {
  COMPLETE = 'COMPLETE',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED'
}

type PaymentBody = {
  amount: number;
  currency: number;
  address_target: string;
  description: string;
}

type PaymentResult = {
  id: number;
  address: string;
  amount: number;
  currency: number;
  address_target: string;
  description: string;
}

const ENDPOINTS = {
  REQUEST: 'https://api.poppypos.com/commerce/v1/payment/generate',
  STATUS: 'https://api.poppypos.com/commerce/v1/payment/status/'
}

type PaymentStatusResponse = { status: PaymentStatus }

class Poppy {
  requestPayment(amount: number, description: string): Promise<PaymentResult> {
    const body = {
      currency: 'TRX',
      amount,
      description
    }
    return fetchHelper<PaymentResult>(ENDPOINTS.REQUEST, 'POST', body)
  }

  getPaymentStatus(id: string): Promise<PaymentStatusResponse> {
    return fetchHelper<PaymentStatusResponse>(ENDPOINTS.STATUS + id)
  }

  paymentSubscribe(id: string, cb: (status: PaymentStatusResponse) => void) {
    const self = this;
    let lastStatus: PaymentStatusResponse | null = null;

    const fetchPayment = (id: string): Promise<PaymentStatusResponse> => {
      console.info('Fetching status');
      return self.getPaymentStatus(id);
    };

    const statusPolling = setInterval(async () => {
      const fetchRes = await fetchPayment(id);
      if (lastStatus !== fetchRes) {
        lastStatus = fetchRes;
        cb(fetchRes);
      }

      if (fetchRes.status === PaymentStatus.COMPLETE) {
        clearInterval(statusPolling);
      }
    }, 1000);
  }
}

const PoppyLink = () => {
  console.info('Starting PoppyLink');
  return new Poppy();
};

(window as any).PoppyLink = PoppyLink();


const fetchHelper = <T>(url: string, method: 'GET' | 'POST' = 'GET', body?: {[key: string]: string | number}): Promise<T> => {
  const initOptions: RequestInit = {}

  if (method === 'POST') {
    initOptions.method = method
    initOptions.body = body as any
    initOptions.headers = {
      'Content-Type': 'application/json'
    }
  }

  return fetch(url, initOptions)
    .then(res => res.json())
}
