# Icon System — Hugeicons Migration

## Overview

This project uses a centralized **Icon abstraction layer** for rendering icons.

The system previously used **Lucide**, but has migrated to **Hugeicons**.

The abstraction ensures:

- consistent sizing
- theme color support
- rotation support
- centralized icon control
- easier future library migrations

Icons should **never be imported directly from the icon library**.

All icons must be rendered through the shared:
