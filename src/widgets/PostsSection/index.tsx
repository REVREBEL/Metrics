"use client"

import { useState } from "react"
import {
  BarChart3,
  Calendar,
  Clock,
  Edit,
  Eye,
  MessageCircle,
  Plus,
  Share2,
  Trash2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Platform = "Facebook" | "Instagram" | "Twitter" | "LinkedIn" | "TikTok"
type PostStatus = "scheduled" | "posted" | "failed" | "draft"
type MediaType = "text" | "image" | "video" | "carousel"

export type SocialPost = {
  id: string
  content: string
  platforms: Platform[]
  scheduledAt: string
  status: PostStatus
  mediaType: MediaType
  tags: string[]
  campaign?: string
  engagement?: {
    likes: number
    comments: number
    shares: number
    views: number
  }
}

export interface PostsSectionProps {
  initialPosts?: SocialPost[]
  onCreatePost?: () => void
  onEditPost?: (post: SocialPost) => void
  onDeletePost?: (post: SocialPost) => void
}

const defaultPosts: SocialPost[] = [
  {
    id: "1",
    content: "Our summer collection launches next week with brighter colors and lighter materials.",
    platforms: ["Instagram", "Facebook", "Twitter"],
    scheduledAt: "2026-03-18T10:00:00Z",
    status: "scheduled",
    mediaType: "carousel",
    tags: ["summer", "launch", "collection"],
    campaign: "Spring to Summer Rollout",
  },
  {
    id: "2",
    content: "We just crossed 10,000 new followers this quarter. Thanks for being here.",
    platforms: ["Instagram", "Facebook", "LinkedIn"],
    scheduledAt: "2026-03-12T14:00:00Z",
    status: "posted",
    mediaType: "image",
    tags: ["milestone", "community"],
    campaign: "Brand Awareness Q1",
    engagement: { likes: 2847, comments: 156, shares: 89, views: 15420 },
  },
  {
    id: "3",
    content: "Maintenance notice for tonight’s product release window and support coverage.",
    platforms: ["Twitter", "LinkedIn"],
    scheduledAt: "2026-03-10T22:00:00Z",
    status: "failed",
    mediaType: "text",
    tags: ["maintenance", "status"],
  },
  {
    id: "4",
    content: "A behind-the-scenes look at how the team plans creative testing for each platform.",
    platforms: ["TikTok", "Instagram"],
    scheduledAt: "2026-03-20T16:00:00Z",
    status: "draft",
    mediaType: "video",
    tags: ["creative", "behind-the-scenes"],
  },
]

function getPlatformColor(platform: Platform) {
  return {
    Facebook: "#1877f2",
    Instagram: "#e4405f",
    Twitter: "#1da1f2",
    LinkedIn: "#0077b5",
    TikTok: "#111827",
  }[platform]
}

function getStatusVariant(status: PostStatus): "default" | "secondary" | "destructive" | "outline" {
  if (status === "posted") return "default"
  if (status === "failed") return "destructive"
  if (status === "scheduled") return "outline"
  return "secondary"
}

function getMediaLabel(mediaType: MediaType) {
  if (mediaType === "video") return "Video"
  if (mediaType === "image") return "Image"
  if (mediaType === "carousel") return "Carousel"
  return "Text"
}

export default function PostsSection({
  initialPosts = defaultPosts,
  onCreatePost,
  onEditPost,
  onDeletePost,
}: PostsSectionProps) {
  const [posts] = useState(initialPosts)

  const totalPosts = posts.length
  const scheduledPosts = posts.filter((post) => post.status === "scheduled").length
  const postedPosts = posts.filter((post) => post.status === "posted").length
  const draftPosts = posts.filter((post) => post.status === "draft").length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Content Management</h2>
          <p className="text-sm text-muted-foreground">Review planned, live, and in-progress content.</p>
        </div>
        <Button onClick={onCreatePost}>
          <Plus data-icon="inline-start" />
          Create Post
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Posts", value: totalPosts, note: "All content items", icon: BarChart3 },
          { label: "Scheduled", value: scheduledPosts, note: "Ready to publish", icon: Clock },
          { label: "Published", value: postedPosts, note: "Live content", icon: Eye },
          { label: "Drafts", value: draftPosts, note: "Needs review", icon: Edit },
        ].map((stat) => {
          const Icon = stat.icon

          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
                <div className="flex flex-col gap-1">
                  <CardDescription>{stat.label}</CardDescription>
                  <CardTitle className="text-2xl">{stat.value}</CardTitle>
                </div>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{stat.note}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{getMediaLabel(post.mediaType)}</Badge>
                  <Badge variant={getStatusVariant(post.status)}>{post.status}</Badge>
                  {post.campaign ? <Badge variant="secondary">{post.campaign}</Badge> : null}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  <span>{new Date(post.scheduledAt).toLocaleString()}</span>
                </div>
                <CardTitle className="text-lg leading-6">{post.content}</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onEditPost?.(post)}>
                  <Edit data-icon="inline-start" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDeletePost?.(post)}>
                  <Trash2 data-icon="inline-start" />
                  Delete
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 lg:flex-row">
                <div className="flex-1">
                  <p className="mb-2 text-sm font-medium">Platforms</p>
                  <div className="flex flex-wrap gap-2">
                    {post.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="rounded-full px-2.5 py-1 text-xs font-medium text-white"
                        style={{ backgroundColor: getPlatformColor(platform) }}
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="mb-2 text-sm font-medium">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {post.engagement ? (
                <div className="grid gap-3 border-t pt-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: "Views", value: post.engagement.views, icon: Eye },
                    { label: "Comments", value: post.engagement.comments, icon: MessageCircle },
                    { label: "Shares", value: post.engagement.shares, icon: Share2 },
                    { label: "Likes", value: post.engagement.likes, icon: BarChart3 },
                  ].map((item) => {
                    const Icon = item.icon

                    return (
                      <div key={item.label} className="rounded-lg border p-3">
                        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon className="size-4" />
                          {item.label}
                        </div>
                        <p className="text-lg font-semibold">{item.value.toLocaleString()}</p>
                      </div>
                    )
                  })}
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
