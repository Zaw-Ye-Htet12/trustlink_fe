// src/components/admin/CategoryFormModal.tsx (Simplified)
"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Category } from "@/interfaces";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    description?: string;
    slug: string;
    is_active?: boolean;
  }) => void;
  isSubmitting: boolean;
  category?: Category;
  title: string;
  description: string;
}

export function CategoryFormModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  category,
  title,
  description,
}: CategoryFormModalProps) {
  const [name, setName] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [slug, setSlug] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Reset form when modal opens with proper cleanup
  useEffect(() => {
    if (isOpen) {
      if (category) {
        // Editing mode
        setName(category.name);
        setDescriptionText(category.description || "");
        setSlug(category.slug);
        setIsActive(category.is_active);
      } else {
        // Create mode
        setName("");
        setDescriptionText("");
        setSlug("");
        setIsActive(true);
      }
    }
  }, [isOpen, category]); // Only run when isOpen or category changes

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleNameChange = (value: string) => {
    setName(value);
    // Only auto-generate slug for new categories
    if (!category) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description: descriptionText || undefined,
      slug,
      is_active: isActive,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Category Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., Home Cleaning"
              required
            />
          </div>

          <div>
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g., home-cleaning"
              required
            />
            <p className="text-xs text-gray-600 mt-1">
              URL-friendly version of the name
            </p>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={descriptionText}
              onChange={(e) => setDescriptionText(e.target.value)}
              placeholder="Describe this category..."
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="is_active" className="text-sm font-medium">
              Active Status
            </Label>
            <Switch
              id="is_active"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Saving..." : "Save Category"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
