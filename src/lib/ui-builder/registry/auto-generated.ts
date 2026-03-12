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
import { Tabs } from "@/components/ui/tabs";
import { Table } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { Sidebar } from "@/components/ui/sidebar";
import { Sheet } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Select } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { PreviewCard } from "@/components/ui/preview-card";
import { Popover } from "@/components/ui/popover";
import { Pagination } from "@/components/ui/pagination";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Menubar } from "@/components/ui/menubar";
import { Menu } from "@/components/ui/menu";
import { Label } from "@/components/ui/label";
import { Kbd } from "@/components/ui/kbd";
import { Item } from "@/components/ui/item";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import { HoverCard } from "@/components/ui/hover-card";
import { Form } from "@/components/ui/form";
import { Field } from "@/components/ui/field";
import { Empty } from "@/components/ui/empty";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
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
import { ButtonGroup } from "@/components/ui/button-group";
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
import { DropZone } from "@/components/ui/ui-builder/internal/dnd/drop-zone";
import { DraggableNewComponent } from "@/components/ui/ui-builder/internal/dnd/draggable-new-component";
import { DragHandle } from "@/components/ui/ui-builder/internal/dnd/drag-handle";
import IconnameField from "@/components/ui/ui-builder/internal/form-fields/iconname-field";
import { ChildrenSearchableSelect } from "@/components/ui/ui-builder/internal/form-fields/children-searchable-select";
import { ResizableWrapper } from "@/components/ui/ui-builder/internal/canvas/resizable-wrapper";
import AutoFrame from "@/components/ui/ui-builder/internal/canvas/auto-frame";
import { NameEdit } from "@/components/ui/ui-builder/internal/components/name-edit";
import MultiSelect from "@/components/ui/ui-builder/internal/components/multi-select";
import { LayerMenu } from "@/components/ui/ui-builder/internal/components/layer-menu";
import { LayerContextMenu } from "@/components/ui/ui-builder/internal/components/layer-context-menu";
import { LayerContextMenuPortal } from "@/components/ui/ui-builder/internal/components/layer-context-menu-portal";
import { ErrorFallback } from "@//components/ui/ui-builder/internal/components/error-fallback";
import { ElementSelector } from "@/components/ui/ui-builder/internal/components/element-selector";
import { DividerControl } from "@/components/ui/ui-builder/internal/components/divider-control";
import { DevProfiler } from "@/components/ui/ui-builder/internal/components/dev-profiler";
import { ThemeAwareDropdownOption } from "@/components/ui/ui-builder/internal/form-fields/classname-control/theme-aware-dropdown-option";
import { ResizeHandle } from "@/components/ui/minimal-tiptap/extensions/image/components/resize-handle";
import { ImageViewBlock } from "@/components/ui/minimal-tiptap/extensions/image/components/image-view-block";
import { ImageOverlay } from "@/components/ui/minimal-tiptap/extensions/image/components/image-overlay";
import { ImageActions } from "@/components/ui/minimal-tiptap/extensions/image/components/image-actions";
import { TreeRowNode } from "@/components/ui/ui-builder/internal/components/tree-row-node";
import { SectionOne } from "@/components/ui/minimal-tiptap/components/section/one";
import { SectionTwo } from "@/components/ui/minimal-tiptap/components/section/two";
import { SectionThree } from "@/components/ui/minimal-tiptap/components/section/three";
import { SectionFour } from "@/components/ui/minimal-tiptap/components/section/four";
import { SectionFive } from "@/components/ui/minimal-tiptap/components/section/five";
import { LinkPopoverBlock } from "@/components/ui/minimal-tiptap/components/link/link-popover-block"
import { LinkEditPopover } from "@/components/ui/minimal-tiptap/components/link/link-edit-popover"
import { ImageEditDialog } from "@/components/ui/minimal-tiptap/components/image/image-edit-dialog";
import { LinkEditBlock } from "@/components/ui/minimal-tiptap/components/link/link-edit-block";
import { ImageEditBlock } from "@/components/ui/minimal-tiptap/components/image/image-edit-block";
import { LinkBubbleMenu } from "@/components/ui/minimal-tiptap/components/bubble-menu/link-bubble-menu";
import ClassnameMultiselect from "@/components/ui/ui-builder/internal/form-fields/classname-control/classname-multiselect";


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

  Tabs: {
    component: Tabs,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/tabs",
  },

  Table: {
    component: Table,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/table",
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

  Pagination: {
    component: Pagination,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/pagination",
  },

  NavigationMenu: {
    component: NavigationMenu,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/navigation-menu",
  },

  Menubar: {
    component: Menubar,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/menubar",
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

  InputGroup: {
    component: InputGroup,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/input-group",
  },

  HoverCard: {
    component: HoverCard,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/hover-card",
  },

  Form: {
    component: Form,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/form",
  },

  Field: {
    component: Field,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/field",
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

  ButtonGroup: {
    component: ButtonGroup,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/button-group",
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
    from: "@/components/ui/server-layer-renderer",
  },

  LayerRenderer: {
    component: LayerRenderer,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/layer-renderer",
  },

  MinimalTiptap: {
    component: MinimalTiptap,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/minimal-tiptap",
  },

  VariablesPanel: {
    component: VariablesPanel,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/variables-panel",
  },

  TailwindThemePanel: {
    component: TailwindThemePanel,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/tailwind-theme-panel",
  },

  PropsPanel: {
    component: PropsPanel,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/props-panel",
  },

  LayersPanel: {
    component: LayersPanel,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/layers-panel",
  },

  EditorPanel: {
    component: EditorPanel,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/editor-panel",
  },

  ConfigPanel: {
    component: ConfigPanel,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/config-panel",
  },

  Markdown: {
    component: Markdown,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/markdown",
  },

  Icon: {
    component: Icon,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/icon",
  },

  Grid: {
    component: Grid,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/grid",
  },

  Flexbox: {
    component: Flexbox,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/flexbox",
  },

  CodePanel: {
    component: CodePanel,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/code-panel",
  },

  ToolbarSection: {
    component: ToolbarSection,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/toolbar-section",
  },

  ToolbarButton: {
    component: ToolbarButton,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/toolbar-button",
  },

  ShortcutKey: {
    component: ShortcutKey,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/shortcut-key",
  },

  MeasuredContainer: {
    component: MeasuredContainer,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/measured-container",
  },

  Object: {
    component: Object,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/object",
  },

  Number: {
    component: Number,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/number",
  },

  Enum: {
    component: Enum,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/enum",
  },

  Date: {
    component: Date,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/date",
  },

  Array: {
    component: Array,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/array",
  },

  DropZone: {
    component: DropZone,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/drop-zone",
  },

  DraggableNewComponent: {
    component: DraggableNewComponent,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/draggable-new-component",
  },

  DragHandle: {
    component: DragHandle,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/drag-handle",
  },

  IconnameField: {
    component: IconnameField,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/iconname-field",
  },

  ChildrenSearchableSelect: {
    component: ChildrenSearchableSelect,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/children-searchable-select",
  },

  ResizableWrapper: {
    component: ResizableWrapper,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/resizable-wrapper",
  },

  AutoFrame: {
    component: AutoFrame,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/auto-frame",
  },

  TreeRowNode: {
    component: TreeRowNode,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/tree-row-node",
  },

  NameEdit: {
    component: NameEdit,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/name-edit",
  },

  MultiSelect: {
    component: MultiSelect,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/multi-select",
  },

  LayerMenu: {
    component: LayerMenu,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/layer-menu",
  },

  LayerContextMenu: {
    component: LayerContextMenu,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/layer-context-menu",
  },

  LayerContextMenuPortal: {
    component: LayerContextMenuPortal,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/layer-context-menu-portal",
  },

  ErrorFallback: {
    component: ErrorFallback,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/error-fallback",
  },

  ElementSelector: {
    component: ElementSelector,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/element-selector",
  },

  DividerControl: {
    component: DividerControl,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/divider-control",
  },

  DevProfiler: {
    component: DevProfiler,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/dev-profiler",
  },

  SectionOne: {
    component: SectionOne,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/one",
  },

  SectionTwo: {
    component: SectionTwo,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/two",
  },

  SectionThree: {
    component: SectionThree,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/three",
  },


  SectionFour: {
    component: SectionFour,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/four",
  },

  SectionFive: {
    component: SectionFive,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/five",
  },

  LinkPopoverBlock: {
    component: LinkPopoverBlock,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/link-popover-block",
  },

  LinkEditPopover: {
    component: LinkEditPopover,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/link-edit-popover",
  },

  LinkEditBlock: {
    component: LinkEditBlock,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/link-edit-block",
  },

  ImageEditDialog: {
    component: ImageEditDialog,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/image-edit-dialog",
  },

  ImageEditBlock: {
    component: ImageEditBlock,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/image-edit-block",
  },

  LinkBubbleMenu: {
    component: LinkBubbleMenu,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/link-bubble-menu",
  },

  ThemeAwareDropdownOption: {
    component: ThemeAwareDropdownOption,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/theme-aware-dropdown-option",
  },

  ClassnameMultiselect: {
    component: ClassnameMultiselect,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/classname-multiselect",
  },

  ResizeHandle: {
    component: ResizeHandle,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/resize-handle",
  },

  ImageViewBlock: {
    component: ImageViewBlock,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/image-view-block",
  },

  ImageOverlay: {
    component: ImageOverlay,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/image-overlay",
  },

  ImageActions: {
    component: ImageActions,
    schema: z.object({
      className: z.string().optional(),
    }),
    from: "@/components/ui/image-actions",
  }
};