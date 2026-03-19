---
title: Creating a Payment Gateway
description: A comprehensive guide to developing custom payment gateway adapters for FOSSBilling.
---

import { Aside, Tabs, TabItem } from '@astrojs/starlight/components';

# Creating a Payment Gateway

This guide walks you through creating a custom payment gateway adapter for FOSSBilling. A payment gateway adapter is a PHP class that integrates an external payment provider (like Stripe, PayPal, or any custom payment processor) into FOSSBilling's invoicing and billing system.

## How Payment Gateways Work

FOSSBilling payment gateways work in two phases:

1. **Payment Initiation** - When a client clicks "Pay", FOSSBilling calls your adapter's `getHtml()` method to display the payment form
2. **IPN/Webhook Callback** - After payment, the gateway calls `ipn.php`, which calls your `processTransaction()` method to verify and process the payment

## Getting Started

### File Placement

Payment adapter files reside under `src/library/Payment/Adapter/`. Use either:
- `MyGateway.php` - Single file
- `MyGateway/MyGateway.php` - Subdirectory (for complex adapters)

### Naming Conventions

- **File name:** `MyGateway.php` (PascalCase)
- **Class name:** `Payment_Adapter_MyGateway` (prefixed with `Payment_Adapter_`)

## Adapter Class Structure

```php
<?php

class Payment_Adapter_MyGateway implements FOSSBilling\InjectionAwareInterface
{
    protected ?Pimple\Container $di = null;

    public function __construct(private $config)
    {
        // Validate required configuration
        if (!isset($this->config['api_key'])) {
            throw new Payment_Exception(
                'The ":pay_gateway" payment gateway is not fully configured. Please configure the :missing',
                [':pay_gateway' => 'MyGateway', ':missing' => 'API Key'],
                4001
            );
        }
    }

    public function setDi(Pimple\Container $di): void
    {
        $this->di = $di;
    }

    public function getDi(): ?Pimple\Container
    {
        return $this->di;
    }

    public static function getConfig(): array
    {
        // Return gateway configuration
    }

    public function getHtml($api_admin, $invoice_id, $subscription): string
    {
        // Return payment form HTML
    }

    public function processTransaction($api_admin, $id, $data, $gateway_id): void
    {
        // Handle IPN/webhook callback
    }
}
```

## The `getConfig()` Method

This static method tells FOSSBilling about your gateway's capabilities and configuration options:

```php
public static function getConfig(): array
{
    return [
        'supports_one_time_payments' => true,
        'supports_subscriptions' => false,
        'can_load_in_iframe' => false,
        'description' => 'Accept payments via MyGateway.',
        'logo' => [
            'logo' => 'mygateway.png',
            'height' => '30px',
            'width' => '65px',
        ],
        'form' => [
            'api_key' => ['text', ['label' => 'API Key:']],
            'api_secret' => ['text', ['label' => 'API Secret:']],
        ],
    ];
}
```

## The `getHtml()` Method

Generates the payment form shown to the client:

```php
public function getHtml($api_admin, $invoice_id, $subscription): string
{
    $invoice = $api_admin->invoice_get(['id' => $invoice_id]);
    
    // Build form with hidden fields
    $fields = [
        'merchant_id' => $this->config['api_key'],
        'amount' => number_format($invoice['total'], 2, '.', ''),
        'currency' => $invoice['currency'],
        'callback_url' => $this->config['notify_url'],
        'success_url' => $this->config['thankyou_url'],
    ];
    
    // Generate form HTML
    $form = '<form action="https://api.mygateway.com/checkout" method="post">';
    foreach ($fields as $key => $value) {
        $form .= sprintf('<input type="hidden" name="%s" value="%s" />', 
            htmlspecialchars($key), htmlspecialchars($value));
    }
    $form .= '<input type="submit" value="Pay" />';
    $form .= '</form>';
    
    return $form;
}
```

## The `processTransaction()` Method

Handles the IPN/webhook callback from the payment gateway:

```php
public function processTransaction($api_admin, $id, $data, $gateway_id): void
{
    // 1. Load transaction
    $tx = $this->di['db']->getExistingModelById('Transaction', $id);
    
    // 2. Load invoice
    $invoiceId = $data['get']['invoice_id'] ?? $data['post']['invoice_id'];
    $invoice = $this->di['db']->getExistingModelById('Invoice', $invoiceId);
    
    // 3. Verify payment with gateway API
    $paymentId = $data['post']['payment_id'];
    $payment = $this->verifyPaymentWithGateway($paymentId);
    
    // 4. Process payment
    if ($payment['status'] === 'completed') {
        $clientService = $this->di['mod_service']('Client');
        $invoiceService = $this->di['mod_service']('Invoice');
        
        // Add funds to client balance
        $client = $this->di['db']->getExistingModelById('Client', $invoice->client_id);
        $clientService->addFunds($client, $payment['amount'], 'MyGateway payment');
        
        // Pay the invoice
        if (!$invoiceService->isInvoiceTypeDeposit($invoice)) {
            $invoiceService->payInvoiceWithCredits($invoice);
        }
        
        $tx->status = 'processed';
    } else {
        $tx->status = 'error';
        $tx->error = 'Payment failed';
    }
    
    $this->di['db']->store($tx);
}
```

## Configuration URLs

FOSSBilling injects these URLs into `$this->config`:

| Key | Purpose |
|-----|---------|
| `notify_url` | IPN/webhook callback URL |
| `return_url` | Redirect after successful payment |
| `cancel_url` | Redirect if client cancels |
| `test_mode` | Whether in sandbox mode |

## Best Practices

1. **Always verify payments server-side** - Never trust client-side data
2. **Validate amount and currency** - Ensure they match the invoice
3. **Handle errors gracefully** - Record errors on the transaction record
4. **Check for duplicate transactions** - Use `$tx->status` to prevent double-processing
5. **Log important events** - Use `$this->di['logger']` for debugging

## Testing

1. Enable test mode in the admin panel
2. Create a test invoice
3. Check transactions in **Invoicing > Transactions**
4. Verify the payment flow works end-to-end

For more detailed information and a complete working example, see the [source code](https://github.com/FOSSBilling/FOSSBilling/blob/main/src/library/Payment/Adapter/) of existing adapters like `Stripe.php` and `PayPalEmail.php`.