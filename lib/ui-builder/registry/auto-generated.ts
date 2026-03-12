/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { TypographyTable } from "@/components/ui/typography-table";
import { TypographySmall } from "@/components/ui/typography-small";
import { TypographyP } from "@/components/ui/typography-p";
import { TypographyMuted } from "@/components/ui/typography-muted";
import { TypographyList } from "@/components/ui/typography-list";
import { TypographyLead } from "@/components/ui/typography-lead";
import { TypographyLarge } from "@/components/ui/typography-large";
import { TypographyInlineCode } from "@/components/ui/typography-inline-code";
import { TypographyH4 } from "@/components/ui/typography-h4";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { TypographyH2 } from "@/components/ui/typography-h2";
import { TypographyH1 } from "@/components/ui/typography-h1";
import { TypographyBlockquote } from "@/components/ui/typography-blockquote";
import { Tooltip } from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import { TextareaInvalid } from "@/components/ui/textarea-invalid";
import { TextareaField } from "@/components/ui/textarea-field";
import { TextareaDisabled } from "@/components/ui/textarea-disabled";
import { TextareaButton } from "@/components/ui/textarea-button";
import { Tabs } from "@/components/ui/tabs";
import { TabsVertical } from "@/components/ui/tabs-vertical";
import { TabsLine } from "@/components/ui/tabs-line";
import { TabsIcons } from "@/components/ui/tabs-icons";
import { TabsDisabled } from "@/components/ui/tabs-disabled";
import { Table } from "@/components/ui/table";
import { TableActions } from "@/components/ui/table-actions";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonText } from "@/components/ui/skeleton-text";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { SkeletonForm } from "@/components/ui/skeleton-form";
import { SkeletonDemo } from "@/components/ui/skeleton-demo";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { SkeletonAvatar } from "@/components/ui/skeleton-avatar";
import { Sidebar } from "@/components/ui/sidebar";
import { Sheet } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Select } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResizableVertical } from "@/components/ui/resizable-vertical";
import ResizableHandle from "@/components/ui/resizable-handle";
import { Rating } from "@/components/ui/rating";
import { RadioGroup } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { PreviewCard } from "@/components/ui/preview-card";
import { Popover } from "@/components/ui/popover";
import { PopoverForm } from "@/components/ui/popover-form";
import { PopoverBasic } from "@/components/ui/popover-basic";
import { PopoverAlignments } from "@/components/ui/popover-alignments";
import { Pagination } from "@/components/ui/pagination";
import { PaginationIconsOnly } from "@/components/ui/pagination-icons-only";
import { NumberField } from "@/components/ui/number-field";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { NativeSelect } from "@/components/ui/native-select";
import { Menubar } from "@/components/ui/menubar";
import { MenubarSubmenu } from "@/components/ui/menubar-submenu";
import { MenubarRadio } from "@/components/ui/menubar-radio";
import { MenubarIcons } from "@/components/ui/menubar-icons";
import { MenubarCheckbox } from "@/components/ui/menubar-checkbox";
import { Menu } from "@/components/ui/menu";
import { Label } from "@/components/ui/label";
import { Kbd } from "@/components/ui/kbd";
import { Item } from "@/components/ui/item";
import { Input } from "@/components/ui/input";
import InputOtpSeparator from "@/components/ui/input-otp-separator";
import InputOtpControlled from "@/components/ui/input-otp-controlled";
import { InputInvalid } from "@/components/ui/input-invalid";
import { InputInputGroup } from "@/components/ui/input-input-group";
import { InputInline } from "@/components/ui/input-inline";
import { InputGroup } from "@/components/ui/input-group";
import { InputGroupWithTooltip } from "@/components/ui/input-group-with-tooltip";
import { InputGroupWithKbd } from "@/components/ui/input-group-with-kbd";
import { InputGroupWithButtons } from "@/components/ui/input-group-with-buttons";
import { InputGroupWithAddons } from "@/components/ui/input-group-with-addons";
import InputGroupTooltip from "@/components/ui/input-group-tooltip";
import InputGroupTextarea from "@/components/ui/input-group-textarea";
import { InputGroupTextareaExamples } from "@/components/ui/input-group-textarea-examples";
import InputGroupText from "@/components/ui/input-group-text";
import InputGroupSpinner from "@/components/ui/input-group-spinner";
import InputGroupLabel from "@/components/ui/input-group-label";
import { InputGroupKbd } from "@/components/ui/input-group-kbd";
import { InputGroupInlineStart } from "@/components/ui/input-group-inline-start";
import { InputGroupInlineEnd } from "@/components/ui/input-group-inline-end";
import { InputGroupInCard } from "@/components/ui/input-group-in-card";
import InputGroupIcon from "@/components/ui/input-group-icon";
import { InputGroupDropdown } from "@/components/ui/input-group-dropdown";
import InputGroupCustom from "@/components/ui/input-group-custom";
import InputGroupButton from "@/components/ui/input-group-button";
import InputGroupButtonGroup from "@/components/ui/input-group-button-group";
import { InputGroupBlockStart } from "@/components/ui/input-group-block-start";
import { InputGroupBlockEnd } from "@/components/ui/input-group-block-end";
import { InputGroupBasic } from "@/components/ui/input-group-basic";
import { InputGrid } from "@/components/ui/input-grid";
import { InputForm } from "@/components/ui/input-form";
import { InputFile } from "@/components/ui/input-file";
import { InputFieldgroup } from "@/components/ui/input-fieldgroup";
import { InputField } from "@/components/ui/input-field";
import { InputDisabled } from "@/components/ui/input-disabled";
import { InputButtonGroup } from "@/components/ui/input-button-group";
import { InputBasic } from "@/components/ui/input-basic";
import { InputBadge } from "@/components/ui/input-badge";
import { HoverCard } from "@/components/ui/hover-card";
import { HoverCardSides } from "@/components/ui/hover-card-sides";
import { Group } from "@/components/ui/group";
import { Form } from "@/components/ui/form";
import { Filters } from "@/components/ui/filters";
import { Field } from "@/components/ui/field";
import FieldGroup from "@/components/ui/field-group";
import { Empty } from "@/components/ui/empty";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuSubmenu } from "@/components/ui/dropdown-menu-submenu";
import { DropdownMenuShortcuts } from "@/components/ui/dropdown-menu-shortcuts";
import { DropdownMenuRadioIcons } from "@/components/ui/dropdown-menu-radio-icons";
import { DropdownMenuIcons } from "@/components/ui/dropdown-menu-icons";
import { DropdownMenuDestructive } from "@/components/ui/dropdown-menu-destructive";
import { DropdownMenuCheckboxes } from "@/components/ui/dropdown-menu-checkboxes";
import { DropdownMenuCheckboxesIcons } from "@/components/ui/dropdown-menu-checkboxes-icons";
import { DropdownMenuBasic } from "@/components/ui/dropdown-menu-basic";
import { DropdownMenuAvatar } from "@/components/ui/dropdown-menu-avatar";
import { Drawer } from "@/components/ui/drawer";
import { Dialog } from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import { ContextMenu } from "@/components/ui/context-menu";
import { Command } from "@/components/ui/command";
import { Combobox } from "@/components/ui/combobox";
import { Collapsible } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Carousel } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import ButtonWithIcon from "@/components/ui/button-with-icon";
import ButtonSpinner from "@/components/ui/button-spinner";
import ButtonSize from "@/components/ui/button-size";
import ButtonSecondary from "@/components/ui/button-secondary";
import ButtonRounded from "@/components/ui/button-rounded";
import ButtonRender from "@/components/ui/button-render";
import ButtonOutline from "@/components/ui/button-outline";
import ButtonLink from "@/components/ui/button-link";
import ButtonIcon from "@/components/ui/button-icon";
import { ButtonGroup } from "@/components/ui/button-group";
import ButtonGroupSplit from "@/components/ui/button-group-split";
import ButtonGroupSize from "@/components/ui/button-group-size";
import ButtonGroupSeparator from "@/components/ui/button-group-separator";
import ButtonGroupSelect from "@/components/ui/button-group-select";
import ButtonGroupPopover from "@/components/ui/button-group-popover";
import ButtonGroupOrientation from "@/components/ui/button-group-orientation";
import { ButtonGroupNested } from "@/components/ui/button-group-nested";
import ButtonGroupInput from "@/components/ui/button-group-input";
import ButtonGroupInputGroup from "@/components/ui/button-group-input-group";
import ButtonGroupDropdown from "@/components/ui/button-group-dropdown";
import ButtonGhost from "@/components/ui/button-ghost";
import ButtonDestructive from "@/components/ui/button-destructive";
import ButtonDefault from "@/components/ui/button-default";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Alert } from "@/components/ui/alert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Accordion } from "@/components/ui/accordion";
import { ServerLayerRenderer } from "@/components/ui/ui-builder/server-layer-renderer";
import LayerRenderer from "@/components/ui/ui-builder/layer-renderer";
import MinimalTiptap from "@/components/ui/minimal-tiptap/minimal-tiptap";
import { VariablesPanel } from "@/components/ui/ui-builder/internal/variables-panel";
import { TailwindThemePanel } from "@/components/ui/ui-builder/internal/tailwind-theme-panel";
import PropsPanel from "@/components/ui/ui-builder/internal/props-panel";
import LayersPanel from "@/components/ui/ui-builder/internal/layers-panel";
import EditorPanel from "@/components/ui/ui-builder/internal/editor-panel";
import { ConfigPanel } from "@/components/ui/ui-builder/internal/config-panel";
import { Markdown } from "@/components/ui/ui-builder/components/markdown";
import { Icon } from "@/components/ui/ui-builder/components/icon";
import { Grid } from "@/components/ui/ui-builder/components/grid";
import { Flexbox } from "@/components/ui/ui-builder/components/flexbox";
import { CodePanel } from "@/components/ui/ui-builder/components/code-panel";
import { ToolbarSection } from "@/components/ui/minimal-tiptap/components/toolbar-section";
import { ToolbarButton } from "@/components/ui/minimal-tiptap/components/toolbar-button";
import { ShortcutKey } from "@/components/ui/minimal-tiptap/components/shortcut-key";
import { MeasuredContainer } from "@/components/ui/minimal-tiptap/components/measured-container";
import Object from "@/components/ui/auto-form/fields/object";
import Number from "@/components/ui/auto-form/fields/number";
import Enum from "@/components/ui/auto-form/fields/enum";
import Date from "@/components/ui/auto-form/fields/date";
import Array from "@/components/ui/auto-form/fields/array";
import IconnameField from "@/components/ui/ui-builder/internal/form-fields/iconname-field";
import { ChildrenSearchableSelect } from "@/components/ui/ui-builder/internal/form-fields/children-searchable-select";
import { DropZone } from "@/components/ui/ui-builder/internal/dnd/drop-zone";
import { DraggableNewComponent } from "@/components/ui/ui-builder/internal/dnd/draggable-new-component";
import { DragHandle } from "@/components/ui/ui-builder/internal/dnd/drag-handle";
import { TreeRowNode } from "@/components/ui/ui-builder/internal/components/tree-row-node";
import { NameEdit } from "@/components/ui/ui-builder/internal/components/name-edit";
import MultiSelect from "@/components/ui/ui-builder/internal/components/multi-select";
import { LayerMenu } from "@/components/ui/ui-builder/internal/components/layer-menu";
import { LayerContextMenu } from "@/components/ui/ui-builder/internal/components/layer-context-menu";
import { LayerContextMenuPortal } from "@/components/ui/ui-builder/internal/components/layer-context-menu-portal";
import { ErrorFallback } from "@/components/ui/ui-builder/internal/components/error-fallback";
import { ElementSelector } from "@/components/ui/ui-builder/internal/components/element-selector";
import { DividerControl } from "@/components/ui/ui-builder/internal/components/divider-control";
import { DevProfiler } from "@/components/ui/ui-builder/internal/components/dev-profiler";
import { ResizableWrapper } from "@/components/ui/ui-builder/internal/canvas/resizable-wrapper";
import AutoFrame from "@/components/ui/ui-builder/internal/canvas/auto-frame";
import Two from "@/components/ui/minimal-tiptap/components/section/two";
import Three from "@/components/ui/minimal-tiptap/components/section/three";
import One from "@/components/ui/minimal-tiptap/components/section/one";
import Four from "@/components/ui/minimal-tiptap/components/section/four";
import Five from "@/components/ui/minimal-tiptap/components/section/five";
import { LinkPopoverBlock } from "@/components/ui/minimal-tiptap/components/link/link-popover-block";
import { LinkEditPopover } from "@/components/ui/minimal-tiptap/components/link/link-edit-popover";
import { LinkEditBlock } from "@/components/ui/minimal-tiptap/components/link/link-edit-block";
import { ImageEditDialog } from "@/components/ui/minimal-tiptap/components/image/image-edit-dialog";
import { ImageEditBlock } from "@/components/ui/minimal-tiptap/components/image/image-edit-block";
import { LinkBubbleMenu } from "@/components/ui/minimal-tiptap/components/bubble-menu/link-bubble-menu";
import { ThemeAwareDropdownOption } from "@/components/ui/ui-builder/internal/form-fields/classname-control/theme-aware-dropdown-option";
import ClassnameMultiselect from "@/components/ui/ui-builder/internal/form-fields/classname-control/classname-multiselect";
import { ResizeHandle } from "@/components/ui/minimal-tiptap/extensions/image/components/resize-handle";
import { ImageViewBlock } from "@/components/ui/minimal-tiptap/extensions/image/components/image-view-block";
import { ImageOverlay } from "@/components/ui/minimal-tiptap/extensions/image/components/image-overlay";
import { ImageActions } from "@/components/ui/minimal-tiptap/extensions/image/components/image-actions";
import { NewChat } from "@/app/(app)/chats/components/new-chat";
import { RecentSales } from "@/app/(app)/dashboard/channels/components/recent-sales";
import { Overview } from "@/app/(app)/dashboard/channels/components/overview";
import { Analytics } from "@/app/(app)/dashboard/channels/components/analytics";
import { AnalyticsChart } from "@/app/(app)/dashboard/channels/components/analytics-chart";

export const autoGeneratedDefinitions: Record<string, any> = {

  TypographyTable: {
    component: TypographyTable,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/typography-table",
  },

  TypographySmall: {
    component: TypographySmall,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/typography-small",
  },

  TypographyP: {
    component: TypographyP,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/typography-p",
  },

  TypographyMuted: {
    component: TypographyMuted,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/typography-muted",
  },

  TypographyList: {
    component: TypographyList,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/typography-list",
  },

  TypographyLead: {
    component: TypographyLead,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/typography-lead",
  },

  TypographyLarge: {
    component: TypographyLarge,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/typography-large",
  },

  TypographyInlineCode: {
    component: TypographyInlineCode,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/typography-inline-code",
  },

  TypographyH4: {
    component: TypographyH4,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/typography-h4",
  },

  TypographyH3: {
    component: TypographyH3,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/typography-h3",
  },

  TypographyH2: {
    component: TypographyH2,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/typography-h2",
  },

  TypographyH1: {
    component: TypographyH1,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/typography-h1",
  },

  TypographyBlockquote: {
    component: TypographyBlockquote,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/typography-blockquote",
  },

  Tooltip: {
    component: Tooltip,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/tooltip",
  },

  Toggle: {
    component: Toggle,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/toggle",
  },

  ToggleGroup: {
    component: ToggleGroup,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/toggle-group",
  },

  Textarea: {
    component: Textarea,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/textarea",
  },

  TextareaInvalid: {
    component: TextareaInvalid,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/textarea-invalid",
  },

  TextareaField: {
    component: TextareaField,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/textarea-field",
  },

  TextareaDisabled: {
    component: TextareaDisabled,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/textarea-disabled",
  },

  TextareaButton: {
    component: TextareaButton,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/textarea-button",
  },

  Tabs: {
    component: Tabs,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/tabs",
  },

  TabsVertical: {
    component: TabsVertical,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/tabs-vertical",
  },

  TabsLine: {
    component: TabsLine,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/tabs-line",
  },

  TabsIcons: {
    component: TabsIcons,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/tabs-icons",
  },

  TabsDisabled: {
    component: TabsDisabled,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/tabs-disabled",
  },

  Table: {
    component: Table,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/table",
  },

  TableActions: {
    component: TableActions,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/table-actions",
  },

  Switch: {
    component: Switch,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/switch",
  },

  Spinner: {
    component: Spinner,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/spinner",
  },

  Slider: {
    component: Slider,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/slider",
  },

  Skeleton: {
    component: Skeleton,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/skeleton",
  },

  SkeletonText: {
    component: SkeletonText,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/skeleton-text",
  },

  SkeletonTable: {
    component: SkeletonTable,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/skeleton-table",
  },

  SkeletonForm: {
    component: SkeletonForm,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/skeleton-form",
  },

  SkeletonDemo: {
    component: SkeletonDemo,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/skeleton-demo",
  },

  SkeletonCard: {
    component: SkeletonCard,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/skeleton-card",
  },

  SkeletonAvatar: {
    component: SkeletonAvatar,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/skeleton-avatar",
  },

  Sidebar: {
    component: Sidebar,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/sidebar",
  },

  Sheet: {
    component: Sheet,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/sheet",
  },

  Separator: {
    component: Separator,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/separator",
  },

  Select: {
    component: Select,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/select",
  },

  ScrollArea: {
    component: ScrollArea,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/scroll-area",
  },

  ResizableVertical: {
    component: ResizableVertical,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/resizable-vertical",
  },

  ResizableHandle: {
    component: ResizableHandle,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/resizable-handle",
  },

  Rating: {
    component: Rating,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/rating",
  },

  RadioGroup: {
    component: RadioGroup,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/radio-group",
  },

  Progress: {
    component: Progress,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/progress",
  },

  PreviewCard: {
    component: PreviewCard,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/preview-card",
  },

  Popover: {
    component: Popover,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/popover",
  },

  PopoverForm: {
    component: PopoverForm,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/popover-form",
  },

  PopoverBasic: {
    component: PopoverBasic,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/popover-basic",
  },

  PopoverAlignments: {
    component: PopoverAlignments,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/popover-alignments",
  },

  Pagination: {
    component: Pagination,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/pagination",
  },

  PaginationIconsOnly: {
    component: PaginationIconsOnly,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/pagination-icons-only",
  },

  NumberField: {
    component: NumberField,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/number-field",
  },

  NavigationMenu: {
    component: NavigationMenu,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/navigation-menu",
  },

  NativeSelect: {
    component: NativeSelect,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/native-select",
  },

  Menubar: {
    component: Menubar,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/menubar",
  },

  MenubarSubmenu: {
    component: MenubarSubmenu,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/menubar-submenu",
  },

  MenubarRadio: {
    component: MenubarRadio,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/menubar-radio",
  },

  MenubarIcons: {
    component: MenubarIcons,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/menubar-icons",
  },

  MenubarCheckbox: {
    component: MenubarCheckbox,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/menubar-checkbox",
  },

  Menu: {
    component: Menu,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/menu",
  },

  Label: {
    component: Label,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/label",
  },

  Kbd: {
    component: Kbd,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/kbd",
  },

  Item: {
    component: Item,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/item",
  },

  Input: {
    component: Input,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input",
  },

  InputOtpSeparator: {
    component: InputOtpSeparator,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-otp-separator",
  },

  InputOtpControlled: {
    component: InputOtpControlled,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-otp-controlled",
  },

  InputInvalid: {
    component: InputInvalid,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-invalid",
  },

  InputInputGroup: {
    component: InputInputGroup,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-input-group",
  },

  InputInline: {
    component: InputInline,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-inline",
  },

  InputGroup: {
    component: InputGroup,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group",
  },

  InputGroupWithTooltip: {
    component: InputGroupWithTooltip,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-with-tooltip",
  },

  InputGroupWithKbd: {
    component: InputGroupWithKbd,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-with-kbd",
  },

  InputGroupWithButtons: {
    component: InputGroupWithButtons,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-with-buttons",
  },

  InputGroupWithAddons: {
    component: InputGroupWithAddons,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-with-addons",
  },

  InputGroupTooltip: {
    component: InputGroupTooltip,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-tooltip",
  },

  InputGroupTextarea: {
    component: InputGroupTextarea,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-textarea",
  },

  InputGroupTextareaExamples: {
    component: InputGroupTextareaExamples,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-textarea-examples",
  },

  InputGroupText: {
    component: InputGroupText,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-text",
  },

  InputGroupSpinner: {
    component: InputGroupSpinner,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-spinner",
  },

  InputGroupLabel: {
    component: InputGroupLabel,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-label",
  },

  InputGroupKbd: {
    component: InputGroupKbd,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-kbd",
  },

  InputGroupInlineStart: {
    component: InputGroupInlineStart,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-inline-start",
  },

  InputGroupInlineEnd: {
    component: InputGroupInlineEnd,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-inline-end",
  },

  InputGroupInCard: {
    component: InputGroupInCard,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-in-card",
  },

  InputGroupIcon: {
    component: InputGroupIcon,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-icon",
  },

  InputGroupDropdown: {
    component: InputGroupDropdown,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-dropdown",
  },

  InputGroupCustom: {
    component: InputGroupCustom,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-custom",
  },

  InputGroupButton: {
    component: InputGroupButton,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-button",
  },

  InputGroupButtonGroup: {
    component: InputGroupButtonGroup,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-button-group",
  },

  InputGroupBlockStart: {
    component: InputGroupBlockStart,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-block-start",
  },

  InputGroupBlockEnd: {
    component: InputGroupBlockEnd,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-block-end",
  },

  InputGroupBasic: {
    component: InputGroupBasic,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group-basic",
  },

  InputGrid: {
    component: InputGrid,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-grid",
  },

  InputForm: {
    component: InputForm,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-form",
  },

  InputFile: {
    component: InputFile,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-file",
  },

  InputFieldgroup: {
    component: InputFieldgroup,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-fieldgroup",
  },

  InputField: {
    component: InputField,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-field",
  },

  InputDisabled: {
    component: InputDisabled,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-disabled",
  },

  InputButtonGroup: {
    component: InputButtonGroup,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-button-group",
  },

  InputBasic: {
    component: InputBasic,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-basic",
  },

  InputBadge: {
    component: InputBadge,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-badge",
  },

  HoverCard: {
    component: HoverCard,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/hover-card",
  },

  HoverCardSides: {
    component: HoverCardSides,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/hover-card-sides",
  },

  Group: {
    component: Group,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/group",
  },

  Form: {
    component: Form,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/form",
  },

  Filters: {
    component: Filters,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/filters",
  },

  Field: {
    component: Field,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/field",
  },

  FieldGroup: {
    component: FieldGroup,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/field-group",
  },

  Empty: {
    component: Empty,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/empty",
  },

  DropdownMenu: {
    component: DropdownMenu,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/dropdown-menu",
  },

  DropdownMenuSubmenu: {
    component: DropdownMenuSubmenu,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/dropdown-menu-submenu",
  },

  DropdownMenuShortcuts: {
    component: DropdownMenuShortcuts,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/dropdown-menu-shortcuts",
  },

  DropdownMenuRadioIcons: {
    component: DropdownMenuRadioIcons,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/dropdown-menu-radio-icons",
  },

  DropdownMenuIcons: {
    component: DropdownMenuIcons,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/dropdown-menu-icons",
  },

  DropdownMenuDestructive: {
    component: DropdownMenuDestructive,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/dropdown-menu-destructive",
  },

  DropdownMenuCheckboxes: {
    component: DropdownMenuCheckboxes,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/dropdown-menu-checkboxes",
  },

  DropdownMenuCheckboxesIcons: {
    component: DropdownMenuCheckboxesIcons,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/dropdown-menu-checkboxes-icons",
  },

  DropdownMenuBasic: {
    component: DropdownMenuBasic,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/dropdown-menu-basic",
  },

  DropdownMenuAvatar: {
    component: DropdownMenuAvatar,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/dropdown-menu-avatar",
  },

  Drawer: {
    component: Drawer,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/drawer",
  },

  Dialog: {
    component: Dialog,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/dialog",
  },

  DatePicker: {
    component: DatePicker,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/date-picker",
  },

  ContextMenu: {
    component: ContextMenu,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/context-menu",
  },

  Command: {
    component: Command,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/command",
  },

  Combobox: {
    component: Combobox,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/combobox",
  },

  Collapsible: {
    component: Collapsible,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/collapsible",
  },

  Checkbox: {
    component: Checkbox,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/checkbox",
  },

  Carousel: {
    component: Carousel,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/carousel",
  },

  Card: {
    component: Card,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/card",
  },

  Calendar: {
    component: Calendar,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/calendar",
  },

  Button: {
    component: Button,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button",
  },

  ButtonWithIcon: {
    component: ButtonWithIcon,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-with-icon",
  },

  ButtonSpinner: {
    component: ButtonSpinner,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-spinner",
  },

  ButtonSize: {
    component: ButtonSize,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-size",
  },

  ButtonSecondary: {
    component: ButtonSecondary,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-secondary",
  },

  ButtonRounded: {
    component: ButtonRounded,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-rounded",
  },

  ButtonRender: {
    component: ButtonRender,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-render",
  },

  ButtonOutline: {
    component: ButtonOutline,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-outline",
  },

  ButtonLink: {
    component: ButtonLink,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-link",
  },

  ButtonIcon: {
    component: ButtonIcon,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-icon",
  },

  ButtonGroup: {
    component: ButtonGroup,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-group",
  },

  ButtonGroupSplit: {
    component: ButtonGroupSplit,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-group-split",
  },

  ButtonGroupSize: {
    component: ButtonGroupSize,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-group-size",
  },

  ButtonGroupSeparator: {
    component: ButtonGroupSeparator,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-group-separator",
  },

  ButtonGroupSelect: {
    component: ButtonGroupSelect,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-group-select",
  },

  ButtonGroupPopover: {
    component: ButtonGroupPopover,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-group-popover",
  },

  ButtonGroupOrientation: {
    component: ButtonGroupOrientation,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-group-orientation",
  },

  ButtonGroupNested: {
    component: ButtonGroupNested,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-group-nested",
  },

  ButtonGroupInput: {
    component: ButtonGroupInput,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-group-input",
  },

  ButtonGroupInputGroup: {
    component: ButtonGroupInputGroup,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-group-input-group",
  },

  ButtonGroupDropdown: {
    component: ButtonGroupDropdown,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-group-dropdown",
  },

  ButtonGhost: {
    component: ButtonGhost,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-ghost",
  },

  ButtonDestructive: {
    component: ButtonDestructive,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-destructive",
  },

  ButtonDefault: {
    component: ButtonDefault,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-default",
  },

  Breadcrumb: {
    component: Breadcrumb,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/breadcrumb",
  },

  Badge: {
    component: Badge,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/badge",
  },

  Avatar: {
    component: Avatar,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/avatar",
  },

  AspectRatio: {
    component: AspectRatio,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/aspect-ratio",
  },

  Alert: {
    component: Alert,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/alert",
  },

  AlertDialog: {
    component: AlertDialog,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/alert-dialog",
  },

  Accordion: {
    component: Accordion,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/accordion",
  },

  ServerLayerRenderer: {
    component: ServerLayerRenderer,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/server-layer-renderer",
  },

  LayerRenderer: {
    component: LayerRenderer,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/layer-renderer",
  },

  MinimalTiptap: {
    component: MinimalTiptap,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/minimal-tiptap",
  },

  VariablesPanel: {
    component: VariablesPanel,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/variables-panel",
  },

  TailwindThemePanel: {
    component: TailwindThemePanel,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/tailwind-theme-panel",
  },

  PropsPanel: {
    component: PropsPanel,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/props-panel",
  },

  LayersPanel: {
    component: LayersPanel,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/layers-panel",
  },

  EditorPanel: {
    component: EditorPanel,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/editor-panel",
  },

  ConfigPanel: {
    component: ConfigPanel,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/config-panel",
  },

  Markdown: {
    component: Markdown,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/components/markdown",
  },

  Icon: {
    component: Icon,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/components/icon",
  },

  Grid: {
    component: Grid,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/components/grid",
  },

  Flexbox: {
    component: Flexbox,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/components/flexbox",
  },

  CodePanel: {
    component: CodePanel,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/components/code-panel",
  },

  ToolbarSection: {
    component: ToolbarSection,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/components/toolbar-section",
  },

  ToolbarButton: {
    component: ToolbarButton,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/components/toolbar-button",
  },

  ShortcutKey: {
    component: ShortcutKey,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/components/shortcut-key",
  },

  MeasuredContainer: {
    component: MeasuredContainer,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/components/measured-container",
  },

  Object: {
    component: Object,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/auto-form/fields/object",
  },

  Number: {
    component: Number,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/auto-form/fields/number",
  },

  Enum: {
    component: Enum,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/auto-form/fields/enum",
  },

  Date: {
    component: Date,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/auto-form/fields/date",
  },

  Array: {
    component: Array,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/auto-form/fields/array",
  },

  IconnameField: {
    component: IconnameField,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/form-fields/iconname-field",
  },

  ChildrenSearchableSelect: {
    component: ChildrenSearchableSelect,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/form-fields/children-searchable-select",
  },

  DropZone: {
    component: DropZone,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/dnd/drop-zone",
  },

  DraggableNewComponent: {
    component: DraggableNewComponent,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/dnd/draggable-new-component",
  },

  DragHandle: {
    component: DragHandle,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/dnd/drag-handle",
  },

  TreeRowNode: {
    component: TreeRowNode,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/components/tree-row-node",
  },

  NameEdit: {
    component: NameEdit,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/components/name-edit",
  },

  MultiSelect: {
    component: MultiSelect,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/components/multi-select",
  },

  LayerMenu: {
    component: LayerMenu,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/components/layer-menu",
  },

  LayerContextMenu: {
    component: LayerContextMenu,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/components/layer-context-menu",
  },

  LayerContextMenuPortal: {
    component: LayerContextMenuPortal,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/components/layer-context-menu-portal",
  },

  ErrorFallback: {
    component: ErrorFallback,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/components/error-fallback",
  },

  ElementSelector: {
    component: ElementSelector,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/components/element-selector",
  },

  DividerControl: {
    component: DividerControl,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/components/divider-control",
  },

  DevProfiler: {
    component: DevProfiler,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/components/dev-profiler",
  },

  ResizableWrapper: {
    component: ResizableWrapper,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/canvas/resizable-wrapper",
  },

  AutoFrame: {
    component: AutoFrame,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/canvas/auto-frame",
  },

  Two: {
    component: Two,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/components/section/two",
  },

  Three: {
    component: Three,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/components/section/three",
  },

  One: {
    component: One,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/components/section/one",
  },

  Four: {
    component: Four,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/components/section/four",
  },

  Five: {
    component: Five,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/components/section/five",
  },

  LinkPopoverBlock: {
    component: LinkPopoverBlock,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/components/link/link-popover-block",
  },

  LinkEditPopover: {
    component: LinkEditPopover,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/components/link/link-edit-popover",
  },

  LinkEditBlock: {
    component: LinkEditBlock,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/components/link/link-edit-block",
  },

  ImageEditDialog: {
    component: ImageEditDialog,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/components/image/image-edit-dialog",
  },

  ImageEditBlock: {
    component: ImageEditBlock,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/components/image/image-edit-block",
  },

  LinkBubbleMenu: {
    component: LinkBubbleMenu,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/components/bubble-menu/link-bubble-menu",
  },

  ThemeAwareDropdownOption: {
    component: ThemeAwareDropdownOption,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/form-fields/classname-control/theme-aware-dropdown-option",
  },

  ClassnameMultiselect: {
    component: ClassnameMultiselect,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/ui-builder/internal/form-fields/classname-control/classname-multiselect",
  },

  ResizeHandle: {
    component: ResizeHandle,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/extensions/image/components/resize-handle",
  },

  ImageViewBlock: {
    component: ImageViewBlock,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/extensions/image/components/image-view-block",
  },

  ImageOverlay: {
    component: ImageOverlay,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/extensions/image/components/image-overlay",
  },

  ImageActions: {
    component: ImageActions,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap/extensions/image/components/image-actions",
  },

  NewChat: {
    component: NewChat,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/app/(app)/chats/components/new-chat",
  },

  RecentSales: {
    component: RecentSales,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/app/(app)/dashboard/channels/components/recent-sales",
  },

  Overview: {
    component: Overview,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/app/(app)/dashboard/channels/components/overview",
  },

  Analytics: {
    component: Analytics,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/app/(app)/dashboard/channels/components/analytics",
  },

  AnalyticsChart: {
    component: AnalyticsChart,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/app/(app)/dashboard/channels/components/analytics-chart",
  }
};