import { FormCheckbox } from '@/components/ui/FormFields';

export const AgreementSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Agreements</h2>
      <p className="text-gray-600">Please review and accept the following agreements to proceed.</p>
      
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <FormCheckbox
            name="diagnosticFeeAcknowledged"
            label={
              <span>
                I understand there is a <strong>$89.99 diagnostic fee</strong> that will be applied to any repair work performed. 
                If you choose not to proceed with the repair, the diagnostic fee is non-refundable.
              </span>
            }
            required
          />
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <FormCheckbox
            name="diagnosticAuthorization"
            label={
              <span>
                I authorize the technician to perform necessary diagnostics to determine the cause of the problem. 
                I understand that additional approval will be required before any repairs are performed.
              </span>
            }
            required
          />
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <FormCheckbox
            name="termsAccepted"
            label={
              <span>
                I have read and agree to the{' '}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>. I understand how my information will be used and stored.
              </span>
            }
            required
          />
        </div>
        
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                <strong>What happens next?</strong> After you submit this form, our team will review your information 
                and contact you within 24 hours to confirm your appointment and answer any questions you may have.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
