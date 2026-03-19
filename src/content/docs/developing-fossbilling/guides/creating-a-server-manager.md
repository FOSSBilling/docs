---
title: Creating a Server Manager (Control Panel Integration)
---

import { Aside } from '@astrojs/starlight/components';

# Creating a server manager

<Aside type="warning">
As we progress toward a 1.0.0 release, developers should anticipate changes to FOSSBilling that necessitate attention before custom modules and integrations regain full functionality.

These modifications will be confined to the 0.x releases and will be outlined in the 'breaking changes' section of the release notes. We are working to add these items to our roadmap to enhance visibility for external developers.

These pre-v1 releases are providing us the opportunity to update obsolete systems and replace cumbersome implementations inherited from the BoxBilling project so we appreciate the patience of external developers.
</Aside>

<Aside type="note">
This guide is incomplete. Please help us complete it by contributing to the documentation repository.
If you're looking to create your own extension, this documentation will tell you the bare minimum required, but looking at existing extensions will probably be necessary to get a complete idea on how to write one.
</Aside>

All server managers should reside under the `/library/Server/Manager` folder. They should all extend the `Server_Manager` class and implement it's functions.

The `Server_Manager` class has inline documentation of each function to aid in the development of server managers. You can find the most up-to-date version of this [here](https://github.com/FOSSBilling/FOSSBilling/blob/main/src/library/Server/Manager.php)