"use client";

import { useState } from "react";
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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  MetricCard,
  MetricCardTitle,
} from "@/widgets/_shared/MetricCard";

type Platform = "Facebook" | "Instagram" | "X" | "LinkedIn" | "TikTok";
type PostStatus = "scheduled" | "posted" | "failed" | "draft";
type MediaType = "text" | "image" | "video" | "carousel";
type SocialKey = "facebook" | "instagram" | "x" | "linkedin" | "tiktok";

export type SocialPost = {
  id: string;
  content: string;
  platforms: Platform[];
  scheduledAt: string;
  status: PostStatus;
  mediaType: MediaType;
  tags: string[];
  campaign?: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
};

export interface PostsSectionProps {
  initialPosts?: SocialPost[];
  onCreatePost?: () => void;
  onEditPost?: (post: SocialPost) => void;
  onDeletePost?: (post: SocialPost) => void;
}

const defaultPosts: SocialPost[] = [
  {
    id: "1",
    content: "Our summer collection launches next week with brighter colors and lighter materials.",
    platforms: ["Instagram", "Facebook", "X"],
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
    platforms: ["X", "LinkedIn"],
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
];

function getPlatformSocial(platform: Platform): SocialKey {
  return {
    Facebook: "facebook",
    Instagram: "instagram",
    X: "x",
    LinkedIn: "linkedin",
    TikTok: "tiktok",
  }[platform];
}

function getPrimarySocial(platforms: Platform[]): SocialKey {
  return platforms[0] ? getPlatformSocial(platforms[0]) : "facebook";
}

function getMediaLabel(mediaType: MediaType) {
  if (mediaType === "video") return "Video";
  if (mediaType === "image") return "Image";
  if (mediaType === "carousel") return "Carousel";
  return "Text";
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function PostsSection({
  initialPosts = defaultPosts,
  onCreatePost,
  onEditPost,
  onDeletePost,
}: PostsSectionProps) {
  const [posts] = useState(initialPosts);

  const totalPosts = posts.length;
  const scheduledPosts = posts.filter((post) => post.status === "scheduled").length;
  const postedPosts = posts.filter((post) => post.status === "posted").length;
  const draftPosts = posts.filter((post) => post.status === "draft").length;

  const summaryStats = [
    { label: "Total Posts", value: totalPosts, note: "All content items", icon: BarChart3, social: "facebook" },
    { label: "Scheduled", value: scheduledPosts, note: "Ready to publish", icon: Clock, social: "instagram" },
    { label: "Published", value: postedPosts, note: "Live content", icon: Eye, social: "tiktok" },
    { label: "Drafts", value: draftPosts, note: "Needs review", icon: Edit, social: "linkedin" },
  ] satisfies Array<{ label: string; value: number; note: string; icon: typeof BarChart3; social: SocialKey }>;

  return (
    <section className="posts-section">
      <div className="posts-section__header">
        <div>
          <MetricCardTitle as="h2">Content Management</MetricCardTitle>
          <p className="metric-card__description">Review planned, live, and in-progress content.</p>
        </div>
        <Button onClick={onCreatePost} className="posts-section__button posts-section__button--primary">
          <Plus data-icon="inline-start" />
          Create Post
        </Button>
      </div>

      <div className="posts-section__summary-grid">
        {summaryStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="posts-section__summary-card" data-social={stat.social}>
              <div>
                <div className="posts-section__summary-label">{stat.label}</div>
                <div className="posts-section__summary-value">{stat.value.toLocaleString()}</div>
                <div className="posts-section__summary-note">{stat.note}</div>
              </div>
              <span className="posts-section__summary-icon" aria-hidden="true">
                <Icon className="size-5" />
              </span>
            </div>
          );
        })}
      </div>

      <MetricCard
        title="Posts Queue"
        description="Planned, published, failed, and draft posts across social channels."
        metric="total"
      >
        <div className="posts-section__list">
          {posts.map((post) => {
            const primarySocial = getPrimarySocial(post.platforms);

            return (
              <article
                key={post.id}
                className="posts-section__post-row"
                data-social={primarySocial}
                data-status={post.status}
              >
                <div className="posts-section__post-header">
                  <div>
                    <div className="posts-section__post-meta">
                      <span className="posts-section__media">{getMediaLabel(post.mediaType)}</span>
                      <span className="posts-section__status">{post.status}</span>
                      {post.campaign ? <span className="posts-section__tag">{post.campaign}</span> : null}
                    </div>
                    <div className="posts-section__post-date">
                      <Calendar className="size-4" />
                      <span>{formatDateTime(post.scheduledAt)}</span>
                    </div>
                    <h3 className="posts-section__post-content">{post.content}</h3>
                  </div>

                  <div className="posts-section__actions">
                    <Button className="posts-section__button" size="sm" onClick={() => onEditPost?.(post)}>
                      <Edit data-icon="inline-start" />
                      Edit
                    </Button>
                    <Button className="posts-section__button" size="sm" onClick={() => onDeletePost?.(post)}>
                      <Trash2 data-icon="inline-start" />
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="posts-section__post-body">
                  <div className="posts-section__platforms">
                    <div className="posts-section__post-label">Platforms</div>
                    <div className="posts-section__chip-row">
                      {post.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="posts-section__platform"
                          data-social={getPlatformSocial(platform)}
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="posts-section__tags">
                    <div className="posts-section__post-label">Tags</div>
                    <div className="posts-section__chip-row">
                      {post.tags.map((tag) => (
                        <span key={tag} className="posts-section__tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {post.engagement ? (
                  <div className="posts-section__engagement-grid">
                    {[
                      { label: "Views", value: post.engagement.views, icon: Eye },
                      { label: "Comments", value: post.engagement.comments, icon: MessageCircle },
                      { label: "Shares", value: post.engagement.shares, icon: Share2 },
                      { label: "Likes", value: post.engagement.likes, icon: BarChart3 },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div key={item.label} className="posts-section__engagement-card">
                          <div className="posts-section__engagement-label">
                            <Icon className="size-4" />
                            {item.label}
                          </div>
                          <div className="posts-section__engagement-value">{item.value.toLocaleString()}</div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </MetricCard>
    </section>
  );
}
