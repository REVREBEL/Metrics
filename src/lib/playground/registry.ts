/* eslint-disable @typescript-eslint/no-explicit-any */
// AUTOMATICALLY GENERATED - DO NOT EDIT
import dynamic from 'next/dynamic';

import { metadata as widget_CalendarHeatmap_metadata } from '@/widgets/CalendarHeatmap/metadata';
import { metadata as widget_MarketSegmentGroupRoomsTable_metadata } from '@/widgets/MarketSegmentGroupRoomsTable/metadata';
import { metadata as widget_MarketSegmentTransientRoomsTable_metadata } from '@/widgets/MarketSegmentTransientRoomsTable/metadata';
import { metadata as widget_OTBStackedBarChart_metadata } from '@/widgets/OTBStackedBarChart/metadata';
import { metadata as widget_StatCard1_metadata } from '@/widgets/StatCard1/metadata';
import { metadata as widget_YearMonthSelector_metadata } from '@/widgets/YearMonthSelector/metadata';


export const PLAYGROUND_REGISTRY: Record<string, any> = {
  widget_CalendarHeatmap: { 
    name: "CalendarHeatmap", 
    type: "widget",
    component: dynamic(() => import('@/widgets/CalendarHeatmap/index').then(mod => (mod as any).default || (mod as any)[Object.keys(mod)[0]])),
    metadata: widget_CalendarHeatmap_metadata
  },
  widget_MarketSegmentGroupRoomsTable: { 
    name: "MarketSegmentGroupRoomsTable", 
    type: "widget",
    component: dynamic(() => import('@/widgets/MarketSegmentGroupRoomsTable/index').then(mod => (mod as any).default || (mod as any)[Object.keys(mod)[0]])),
    metadata: widget_MarketSegmentGroupRoomsTable_metadata
  },
  widget_MarketSegmentTransientRoomsTable: { 
    name: "MarketSegmentTransientRoomsTable", 
    type: "widget",
    component: dynamic(() => import('@/widgets/MarketSegmentTransientRoomsTable/index').then(mod => (mod as any).default || (mod as any)[Object.keys(mod)[0]])),
    metadata: widget_MarketSegmentTransientRoomsTable_metadata
  },
  widget_OTBStackedBarChart: { 
    name: "OTBStackedBarChart", 
    type: "widget",
    component: dynamic(() => import('@/widgets/OTBStackedBarChart/index').then(mod => (mod as any).default || (mod as any)[Object.keys(mod)[0]])),
    metadata: widget_OTBStackedBarChart_metadata
  },
  widget_StatCard1: { 
    name: "StatCard1", 
    type: "widget",
    component: dynamic(() => import('@/widgets/StatCard1/index').then(mod => (mod as any).default || (mod as any)[Object.keys(mod)[0]])),
    metadata: widget_StatCard1_metadata
  },
  widget_YearMonthSelector: { 
    name: "YearMonthSelector", 
    type: "widget",
    component: dynamic(() => import('@/widgets/YearMonthSelector/index').then(mod => (mod as any).default || (mod as any)[Object.keys(mod)[0]])),
    metadata: widget_YearMonthSelector_metadata
  },
  ui_accordion: { 
    name: "accordion", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/accordion').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Accordion"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_alert_dialog: { 
    name: "alert-dialog", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/alert-dialog').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["AlertDialog"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_alert: { 
    name: "alert", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/alert').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Alert"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_aspect_ratio: { 
    name: "aspect-ratio", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/aspect-ratio').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["AspectRatio"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_avatar: { 
    name: "avatar", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/avatar').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Avatar"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_badge: { 
    name: "badge", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/badge').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Badge"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_breadcrumb: { 
    name: "breadcrumb", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/breadcrumb').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Breadcrumb"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_default: { 
    name: "button-default", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-default').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonDefault"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_destructive: { 
    name: "button-destructive", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-destructive').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonDestructive"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_ghost: { 
    name: "button-ghost", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-ghost').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonGhost"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_group_dropdown: { 
    name: "button-group-dropdown", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-group-dropdown').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonGroupDropdown"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_group_input_group: { 
    name: "button-group-input-group", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-group-input-group').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonGroupInputGroup"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_group_input: { 
    name: "button-group-input", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-group-input').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonGroupInput"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_group_nested: { 
    name: "button-group-nested", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-group-nested').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonGroupNested"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_group_orientation: { 
    name: "button-group-orientation", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-group-orientation').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonGroupOrientation"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_group_popover: { 
    name: "button-group-popover", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-group-popover').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonGroupPopover"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_group_select: { 
    name: "button-group-select", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-group-select').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonGroupSelect"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_group_separator: { 
    name: "button-group-separator", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-group-separator').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonGroupSeparator"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_group_size: { 
    name: "button-group-size", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-group-size').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonGroupSize"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_group_split: { 
    name: "button-group-split", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-group-split').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonGroupSplit"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_group: { 
    name: "button-group", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-group').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonGroup"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_icon: { 
    name: "button-icon", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-icon').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonIcon"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_link: { 
    name: "button-link", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-link').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonLink"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_outline: { 
    name: "button-outline", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-outline').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonOutline"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_render: { 
    name: "button-render", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-render').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonRender"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_rounded: { 
    name: "button-rounded", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-rounded').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonRounded"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_secondary: { 
    name: "button-secondary", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-secondary').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonSecondary"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_size: { 
    name: "button-size", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-size').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonSize"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_spinner: { 
    name: "button-spinner", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-spinner').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonSpinner"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button_with_icon: { 
    name: "button-with-icon", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button-with-icon').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ButtonWithIcon"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_button: { 
    name: "button", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/button').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Button"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_calendar: { 
    name: "calendar", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/calendar').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Calendar"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_card: { 
    name: "card", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/card').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Card"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_carousel: { 
    name: "carousel", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/carousel').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Carousel"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_chart: { 
    name: "chart", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/chart').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Chart"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_checkbox: { 
    name: "checkbox", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/checkbox').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Checkbox"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_collapsible: { 
    name: "collapsible", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/collapsible').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Collapsible"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_combobox: { 
    name: "combobox", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/combobox').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Combobox"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_command: { 
    name: "command", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/command').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Command"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_context_menu: { 
    name: "context-menu", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/context-menu').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ContextMenu"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_dialog: { 
    name: "dialog", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/dialog').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Dialog"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_direction: { 
    name: "direction", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/direction').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Direction"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_drawer: { 
    name: "drawer", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/drawer').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Drawer"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_dropdown_menu_avatar: { 
    name: "dropdown-menu-avatar", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/dropdown-menu-avatar').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["DropdownMenuAvatar"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_dropdown_menu_basic: { 
    name: "dropdown-menu-basic", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/dropdown-menu-basic').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["DropdownMenuBasic"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_dropdown_menu_checkboxes_icons: { 
    name: "dropdown-menu-checkboxes-icons", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/dropdown-menu-checkboxes-icons').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["DropdownMenuCheckboxesIcons"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_dropdown_menu_checkboxes: { 
    name: "dropdown-menu-checkboxes", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/dropdown-menu-checkboxes').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["DropdownMenuCheckboxes"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_dropdown_menu_destructive: { 
    name: "dropdown-menu-destructive", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/dropdown-menu-destructive').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["DropdownMenuDestructive"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_dropdown_menu_icons: { 
    name: "dropdown-menu-icons", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/dropdown-menu-icons').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["DropdownMenuIcons"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_dropdown_menu_radio_group: { 
    name: "dropdown-menu-radio-group", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/dropdown-menu-radio-group').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["DropdownMenuRadioGroup"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_dropdown_menu_radio_icons: { 
    name: "dropdown-menu-radio-icons", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/dropdown-menu-radio-icons').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["DropdownMenuRadioIcons"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_dropdown_menu_shortcuts: { 
    name: "dropdown-menu-shortcuts", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/dropdown-menu-shortcuts').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["DropdownMenuShortcuts"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_dropdown_menu_submenu: { 
    name: "dropdown-menu-submenu", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/dropdown-menu-submenu').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["DropdownMenuSubmenu"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_dropdown_menu: { 
    name: "dropdown-menu", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/dropdown-menu').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["DropdownMenu"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_empty: { 
    name: "empty", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/empty').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Empty"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_field_group: { 
    name: "field-group", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/field-group').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["FieldGroup"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_field: { 
    name: "field", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/field').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Field"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_filters: { 
    name: "filters", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/filters').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Filters"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_form: { 
    name: "form", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/form').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Form"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_group: { 
    name: "group", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/group').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Group"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_hover_card_sides: { 
    name: "hover-card-sides", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/hover-card-sides').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["HoverCardSides"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_hover_card: { 
    name: "hover-card", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/hover-card').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["HoverCard"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_badge: { 
    name: "input-badge", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-badge').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputBadge"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_basic: { 
    name: "input-basic", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-basic').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputBasic"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_button_group: { 
    name: "input-button-group", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-button-group').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputButtonGroup"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_disabled: { 
    name: "input-disabled", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-disabled').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputDisabled"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_field: { 
    name: "input-field", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-field').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputField"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_fieldgroup: { 
    name: "input-fieldgroup", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-fieldgroup').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputFieldgroup"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_file: { 
    name: "input-file", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-file').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputFile"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_form: { 
    name: "input-form", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-form').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputForm"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_grid: { 
    name: "input-grid", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-grid').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGrid"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_basic: { 
    name: "input-group-basic", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-basic').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupBasic"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_block_end: { 
    name: "input-group-block-end", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-block-end').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupBlockEnd"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_block_start: { 
    name: "input-group-block-start", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-block-start').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupBlockStart"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_button_group: { 
    name: "input-group-button-group", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-button-group').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupButtonGroup"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_button: { 
    name: "input-group-button", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-button').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupButton"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_custom: { 
    name: "input-group-custom", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-custom').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupCustom"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_dropdown: { 
    name: "input-group-dropdown", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-dropdown').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupDropdown"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_icon: { 
    name: "input-group-icon", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-icon').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupIcon"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_in_card: { 
    name: "input-group-in-card", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-in-card').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupInCard"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_inline_end: { 
    name: "input-group-inline-end", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-inline-end').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupInlineEnd"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_inline_start: { 
    name: "input-group-inline-start", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-inline-start').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupInlineStart"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_kbd: { 
    name: "input-group-kbd", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-kbd').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupKbd"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_label: { 
    name: "input-group-label", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-label').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupLabel"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_spinner: { 
    name: "input-group-spinner", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-spinner').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupSpinner"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_text: { 
    name: "input-group-text", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-text').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupText"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_textarea_examples: { 
    name: "input-group-textarea-examples", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-textarea-examples').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupTextareaExamples"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_textarea: { 
    name: "input-group-textarea", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-textarea').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupTextarea"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_tooltip: { 
    name: "input-group-tooltip", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-tooltip').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupTooltip"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_with_addons: { 
    name: "input-group-with-addons", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-with-addons').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupWithAddons"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_with_buttons: { 
    name: "input-group-with-buttons", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-with-buttons').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupWithButtons"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_with_kbd: { 
    name: "input-group-with-kbd", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-with-kbd').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupWithKbd"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group_with_tooltip: { 
    name: "input-group-with-tooltip", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group-with-tooltip').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroupWithTooltip"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_group: { 
    name: "input-group", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-group').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputGroup"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_inline: { 
    name: "input-inline", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-inline').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputInline"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_input_group: { 
    name: "input-input-group", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-input-group').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputInputGroup"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_invalid: { 
    name: "input-invalid", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-invalid').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputInvalid"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_otp_alphanumeric: { 
    name: "input-otp-alphanumeric", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-otp-alphanumeric').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputOtpAlphanumeric"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_otp_controlled: { 
    name: "input-otp-controlled", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-otp-controlled').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputOtpControlled"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_otp_disabled: { 
    name: "input-otp-disabled", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-otp-disabled').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputOtpDisabled"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_otp_form: { 
    name: "input-otp-form", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-otp-form').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputOtpForm"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_otp_four_digits: { 
    name: "input-otp-four-digits", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-otp-four-digits').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputOtpFourDigits"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_otp_invalid: { 
    name: "input-otp-invalid", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-otp-invalid').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputOtpInvalid"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_otp_pattern: { 
    name: "input-otp-pattern", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-otp-pattern').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputOtpPattern"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_otp_separator: { 
    name: "input-otp-separator", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-otp-separator').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputOtpSeparator"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input_otp: { 
    name: "input-otp", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input-otp').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["InputOtp"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_input: { 
    name: "input", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/input').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Input"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_item: { 
    name: "item", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/item').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Item"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_kbd: { 
    name: "kbd", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/kbd').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Kbd"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_label: { 
    name: "label", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/label').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Label"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_menu: { 
    name: "menu", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/menu').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Menu"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_menubar_checkbox: { 
    name: "menubar-checkbox", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/menubar-checkbox').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["MenubarCheckbox"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_menubar_icons: { 
    name: "menubar-icons", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/menubar-icons').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["MenubarIcons"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_menubar_radio: { 
    name: "menubar-radio", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/menubar-radio').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["MenubarRadio"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_menubar_submenu: { 
    name: "menubar-submenu", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/menubar-submenu').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["MenubarSubmenu"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_menubar: { 
    name: "menubar", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/menubar').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Menubar"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_native_select: { 
    name: "native-select", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/native-select').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["NativeSelect"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_navigation_menu: { 
    name: "navigation-menu", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/navigation-menu').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["NavigationMenu"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_number_field: { 
    name: "number-field", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/number-field').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["NumberField"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_pagination_icons_only: { 
    name: "pagination-icons-only", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/pagination-icons-only').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["PaginationIconsOnly"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_pagination: { 
    name: "pagination", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/pagination').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Pagination"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_popover_alignments: { 
    name: "popover-alignments", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/popover-alignments').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["PopoverAlignments"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_popover_basic: { 
    name: "popover-basic", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/popover-basic').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["PopoverBasic"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_popover_form: { 
    name: "popover-form", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/popover-form').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["PopoverForm"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_popover: { 
    name: "popover", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/popover').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Popover"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_preview_card: { 
    name: "preview-card", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/preview-card').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["PreviewCard"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_progress: { 
    name: "progress", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/progress').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Progress"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_radio_group: { 
    name: "radio-group", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/radio-group').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["RadioGroup"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_rating: { 
    name: "rating", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/rating').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Rating"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_resizable_handle: { 
    name: "resizable-handle", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/resizable-handle').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ResizableHandle"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_resizable_vertical: { 
    name: "resizable-vertical", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/resizable-vertical').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ResizableVertical"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_resizable: { 
    name: "resizable", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/resizable').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Resizable"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_scroll_area: { 
    name: "scroll-area", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/scroll-area').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ScrollArea"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_select: { 
    name: "select", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/select').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Select"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_separator: { 
    name: "separator", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/separator').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Separator"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_sheet: { 
    name: "sheet", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/sheet').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Sheet"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_sidebar: { 
    name: "sidebar", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/sidebar').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Sidebar"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_skeleton_avatar: { 
    name: "skeleton-avatar", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/skeleton-avatar').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["SkeletonAvatar"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_skeleton_card: { 
    name: "skeleton-card", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/skeleton-card').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["SkeletonCard"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_skeleton_demo: { 
    name: "skeleton-demo", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/skeleton-demo').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["SkeletonDemo"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_skeleton_form: { 
    name: "skeleton-form", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/skeleton-form').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["SkeletonForm"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_skeleton_table: { 
    name: "skeleton-table", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/skeleton-table').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["SkeletonTable"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_skeleton_text: { 
    name: "skeleton-text", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/skeleton-text').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["SkeletonText"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_skeleton: { 
    name: "skeleton", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/skeleton').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Skeleton"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_slider: { 
    name: "slider", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/slider').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Slider"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_sonner: { 
    name: "sonner", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/sonner').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Sonner"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_spinner: { 
    name: "spinner", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/spinner').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Spinner"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_switch: { 
    name: "switch", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/switch').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Switch"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_table_actions: { 
    name: "table-actions", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/table-actions').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TableActions"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_table_footer: { 
    name: "table-footer", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/table-footer').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TableFooter"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_table: { 
    name: "table", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/table').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Table"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_tabs_disabled: { 
    name: "tabs-disabled", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/tabs-disabled').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TabsDisabled"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_tabs_icons: { 
    name: "tabs-icons", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/tabs-icons').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TabsIcons"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_tabs_line: { 
    name: "tabs-line", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/tabs-line').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TabsLine"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_tabs_vertical: { 
    name: "tabs-vertical", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/tabs-vertical').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TabsVertical"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_tabs: { 
    name: "tabs", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/tabs').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Tabs"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_textarea_button: { 
    name: "textarea-button", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/textarea-button').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TextareaButton"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_textarea_disabled: { 
    name: "textarea-disabled", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/textarea-disabled').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TextareaDisabled"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_textarea_field: { 
    name: "textarea-field", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/textarea-field').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TextareaField"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_textarea_invalid: { 
    name: "textarea-invalid", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/textarea-invalid').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TextareaInvalid"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_textarea: { 
    name: "textarea", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/textarea').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Textarea"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_toast: { 
    name: "toast", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/toast').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Toast"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_toggle_group: { 
    name: "toggle-group", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/toggle-group').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["ToggleGroup"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_toggle: { 
    name: "toggle", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/toggle').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Toggle"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_tooltip: { 
    name: "tooltip", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/tooltip').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["Tooltip"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_typography_blockquote: { 
    name: "typography-blockquote", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/typography-blockquote').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TypographyBlockquote"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_typography_h1: { 
    name: "typography-h1", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/typography-h1').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TypographyH1"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_typography_h2: { 
    name: "typography-h2", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/typography-h2').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TypographyH2"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_typography_h3: { 
    name: "typography-h3", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/typography-h3').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TypographyH3"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_typography_h4: { 
    name: "typography-h4", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/typography-h4').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TypographyH4"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_typography_inline_code: { 
    name: "typography-inline-code", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/typography-inline-code').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TypographyInlineCode"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_typography_large: { 
    name: "typography-large", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/typography-large').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TypographyLarge"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_typography_lead: { 
    name: "typography-lead", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/typography-lead').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TypographyLead"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_typography_list: { 
    name: "typography-list", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/typography-list').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TypographyList"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_typography_muted: { 
    name: "typography-muted", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/typography-muted').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TypographyMuted"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_typography_p: { 
    name: "typography-p", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/typography-p').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TypographyP"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_typography_small: { 
    name: "typography-small", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/typography-small').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TypographySmall"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  ui_typography_table: { 
    name: "typography-table", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/typography-table').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["TypographyTable"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_coming_soon: { 
    name: "coming-soon", 
    type: "custom-component",
    component: dynamic(() => import('@/components/coming-soon').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_command_menu: { 
    name: "command-menu", 
    type: "custom-component",
    component: dynamic(() => import('@/components/command-menu').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_config_drawer: { 
    name: "config-drawer", 
    type: "custom-component",
    component: dynamic(() => import('@/components/config-drawer').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_confirm_dialog: { 
    name: "confirm-dialog", 
    type: "custom-component",
    component: dynamic(() => import('@/components/confirm-dialog').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_date_picker: { 
    name: "date-picker", 
    type: "custom-component",
    component: dynamic(() => import('@/components/date-picker').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_day_picker: { 
    name: "day-picker", 
    type: "custom-component",
    component: dynamic(() => import('@/components/day-picker').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_discover_button: { 
    name: "discover-button", 
    type: "custom-component",
    component: dynamic(() => import('@/components/discover-button').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_discrete_tabs: { 
    name: "discrete-tabs", 
    type: "custom-component",
    component: dynamic(() => import('@/components/discrete-tabs').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_edit_switch: { 
    name: "edit-switch", 
    type: "custom-component",
    component: dynamic(() => import('@/components/edit-switch').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_learn_more: { 
    name: "learn-more", 
    type: "custom-component",
    component: dynamic(() => import('@/components/learn-more').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_list_item: { 
    name: "list-item", 
    type: "custom-component",
    component: dynamic(() => import('@/components/list-item').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_long_text: { 
    name: "long-text", 
    type: "custom-component",
    component: dynamic(() => import('@/components/long-text').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_navigation_progress: { 
    name: "navigation-progress", 
    type: "custom-component",
    component: dynamic(() => import('@/components/navigation-progress').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_p_breadcrumb_1: { 
    name: "p-breadcrumb-1", 
    type: "custom-component",
    component: dynamic(() => import('@/components/p-breadcrumb-1').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_p_button_40: { 
    name: "p-button-40", 
    type: "custom-component",
    component: dynamic(() => import('@/components/p-button-40').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_p_combobox_11: { 
    name: "p-combobox-11", 
    type: "custom-component",
    component: dynamic(() => import('@/components/p-combobox-11').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_p_combobox_14: { 
    name: "p-combobox-14", 
    type: "custom-component",
    component: dynamic(() => import('@/components/p-combobox-14').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_p_date_picker_3: { 
    name: "p-date-picker-3", 
    type: "custom-component",
    component: dynamic(() => import('@/components/p-date-picker-3').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_p_date_picker_6: { 
    name: "p-date-picker-6", 
    type: "custom-component",
    component: dynamic(() => import('@/components/p-date-picker-6').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_p_date_picker_7: { 
    name: "p-date-picker-7", 
    type: "custom-component",
    component: dynamic(() => import('@/components/p-date-picker-7').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_p_date_picker_9: { 
    name: "p-date-picker-9", 
    type: "custom-component",
    component: dynamic(() => import('@/components/p-date-picker-9').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_p_menu_2: { 
    name: "p-menu-2", 
    type: "custom-component",
    component: dynamic(() => import('@/components/p-menu-2').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_p_menu_3: { 
    name: "p-menu-3", 
    type: "custom-component",
    component: dynamic(() => import('@/components/p-menu-3').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_p_preview_card_1: { 
    name: "p-preview-card-1", 
    type: "custom-component",
    component: dynamic(() => import('@/components/p-preview-card-1').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_p_slider_1: { 
    name: "p-slider-1", 
    type: "custom-component",
    component: dynamic(() => import('@/components/p-slider-1').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_p_slider_22: { 
    name: "p-slider-22", 
    type: "custom-component",
    component: dynamic(() => import('@/components/p-slider-22').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_password_input: { 
    name: "password-input", 
    type: "custom-component",
    component: dynamic(() => import('@/components/password-input').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_profile_dropdown: { 
    name: "profile-dropdown", 
    type: "custom-component",
    component: dynamic(() => import('@/components/profile-dropdown').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_providers: { 
    name: "providers", 
    type: "custom-component",
    component: dynamic(() => import('@/components/providers').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_search: { 
    name: "search", 
    type: "custom-component",
    component: dynamic(() => import('@/components/search').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_select_dropdown: { 
    name: "select-dropdown", 
    type: "custom-component",
    component: dynamic(() => import('@/components/select-dropdown').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_sign_out_dialog: { 
    name: "sign-out-dialog", 
    type: "custom-component",
    component: dynamic(() => import('@/components/sign-out-dialog').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_skip_to_main: { 
    name: "skip-to-main", 
    type: "custom-component",
    component: dynamic(() => import('@/components/skip-to-main').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_smooth_dropdown: { 
    name: "smooth-dropdown", 
    type: "custom-component",
    component: dynamic(() => import('@/components/smooth-dropdown').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_status_button: { 
    name: "status-button", 
    type: "custom-component",
    component: dynamic(() => import('@/components/status-button').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_swap_layout_loader: { 
    name: "swap-layout-loader", 
    type: "custom-component",
    component: dynamic(() => import('@/components/swap-layout-loader').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_swap_layout: { 
    name: "swap-layout", 
    type: "custom-component",
    component: dynamic(() => import('@/components/swap-layout').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_tailwind_indicator: { 
    name: "tailwind-indicator", 
    type: "custom-component",
    component: dynamic(() => import('@/components/tailwind-indicator').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_theme_switch: { 
    name: "theme-switch", 
    type: "custom-component",
    component: dynamic(() => import('@/components/theme-switch').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_transactions_loader: { 
    name: "transactions-loader", 
    type: "custom-component",
    component: dynamic(() => import('@/components/transactions-loader').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  },
  custom_transactions: { 
    name: "transactions", 
    type: "custom-component",
    component: dynamic(() => import('@/components/transactions').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  }
};