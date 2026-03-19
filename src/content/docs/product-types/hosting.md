---
title: Hosting
description: This page documents the "hosting" product type that is available within FOSSBilling.
---

import { Aside } from '@astrojs/starlight/components';

# The Hosting Product Type

<Aside type="note">
This guide is incomplete. Please help us complete it by contributing to the documentation repository.
</Aside>

## Current Status

Implemented, but in a fairly simplistic way and without some creature comforts, such as:

 - No way to import existing accounts from a control panel.
 - When you suspend an order, the suspension reason is not sent to the control panel and is only used on the FOSSBilling end (Such as in an email to the client).
 - No support for SSO (logging clients into the control panel automatically).

### Working Control Panel Integrations

These are known-working control panel integrations that FOSSBilling has:
 - [CWP](https://control-webpanel.com/) (Control-WebPanel)
 - [HestiaCP](https://hestiacp.com/)
 - [DirectAdmin](https://www.directadmin.com/)
 - [cPanel/WHM](https://cpanel.net/)
 - [Plesk](https://www.plesk.com/) (There appears to be a minor bug with this server manager that we hope to get cleaned up with the next FOSSBilling release.)

*Note:* Anything not listed here is likely to not work at all.