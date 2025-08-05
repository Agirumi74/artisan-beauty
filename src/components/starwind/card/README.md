# 🃏 Luxury Card Components

## Overview

The Card component system has been enhanced to support luxury design variants that align with the Artisan Beauty brand identity. These components provide elegant, sophisticated styling for premium user experiences.

## Components

### Card (Root Component)

The main container with luxury styling variants.

**Props:**
- `variant`: `"default" | "luxury" | "luxury-featured"` (default: "default")
- `withHover`: `boolean` (default: true) - Enables hover lift effect
- `withAnimation`: `boolean` (default: false) - Adds fade-in animation

**Variants:**

#### Default
Basic card styling for general use.

#### Luxury
Premium card with ivory background, gold champagne border, and luxury shadow effects.

#### Luxury Featured
Enhanced card with gradient background, gold border, accent bar, and stronger shadows.

### CardHeader

Header section with responsive padding.

**Props:**
- `variant`: `"default" | "luxury" | "luxury-featured"`
- `hasImage`: `boolean` (default: false) - Removes top padding when card has an image

### CardContent

Main content area with variant-specific padding.

**Props:**
- `variant`: `"default" | "luxury" | "luxury-featured"`

### CardFooter

Footer section for actions and metadata.

**Props:**
- `variant`: `"default" | "luxury" | "luxury-featured"`

### CardTitle

Heading component with luxury typography.

**Props:**
- `variant`: `"default" | "luxury" | "luxury-featured"`
- `size`: `"sm" | "md" | "lg"` (default: "lg")

**Styling:**
- Luxury variants use Rouge Script font (brand heading font)
- Featured variant uses gold primary color

### CardDescription

Descriptive text with brand typography.

**Props:**
- `variant`: `"default" | "luxury" | "luxury-featured"`

### CardBadge

Status or category indicators.

**Props:**
- `variant`: `"default" | "luxury" | "featured" | "new"`
- `size`: `"sm" | "md" | "lg"` (default: "sm")

### CardImage

Responsive image container with overlay effects.

**Props:**
- `src`: `string` (required)
- `alt`: `string` (required)
- `aspectRatio`: `"square" | "video" | "photo" | "portrait"` (default: "photo")
- `withOverlay`: `boolean` (default: false) - Adds gradient overlay
- `withHover`: `boolean` (default: true) - Enables hover scale effect

## Usage Examples

### Basic Luxury Card

```astro
---
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@components/starwind/card';
---

<Card variant="luxury" withHover={true}>
  <CardHeader variant="luxury">
    <CardTitle variant="luxury" size="md">
      Service Title
    </CardTitle>
  </CardHeader>
  <CardContent variant="luxury">
    <p>Service description goes here...</p>
  </CardContent>
  <CardFooter variant="luxury">
    <a href="#" class="btn-luxury-secondary">En savoir plus</a>
  </CardFooter>
</Card>
```

### Featured Luxury Card with Image and Badge

```astro
---
import { Card, CardImage, CardBadge, CardHeader, CardTitle, CardContent, CardFooter } from '@components/starwind/card';
---

<Card variant="luxury-featured" withHover={true} withAnimation={true} class="group">
  <CardImage 
    src="/path/to/image.jpg" 
    alt="Service image"
    aspectRatio="photo"
    withOverlay={true}
  >
    <CardBadge variant="featured" class="absolute top-4 right-4">
      Premium
    </CardBadge>
  </CardImage>
  
  <CardHeader variant="luxury-featured" hasImage={true}>
    <CardTitle variant="luxury-featured" size="md">
      Premium Service
    </CardTitle>
  </CardHeader>
  
  <CardContent variant="luxury-featured">
    <CardDescription variant="luxury-featured">
      Detailed service description with luxury styling.
    </CardDescription>
  </CardContent>
  
  <CardFooter variant="luxury-featured">
    <a href="#" class="btn-luxury-primary w-full">
      Réserver maintenant
    </a>
  </CardFooter>
</Card>
```

### Service Card with Badges and Animation

```astro
<Card variant="luxury" withAnimation={true} class="animate-stagger-1">
  <CardImage src="/service.jpg" alt="Service" withOverlay={true}>
    <CardBadge variant="new" class="absolute top-4 left-4">
      Nouveauté
    </CardBadge>
    <div class="absolute top-4 right-4 bg-brand-gold-primary text-white px-3 py-1 rounded-full text-sm">
      €150
    </div>
  </CardImage>
  
  <CardContent variant="luxury">
    <CardTitle variant="luxury" size="md" class="mb-3">
      Maquillage Mariée
    </CardTitle>
    
    <div class="flex gap-2 mb-4">
      <CardBadge variant="luxury">Mariage</CardBadge>
      <CardBadge variant="luxury">3h</CardBadge>
    </div>
    
    <CardDescription variant="luxury" class="mb-6">
      Sublimez votre beauté pour le plus beau jour de votre vie...
    </CardDescription>
    
    <a href="/services/mariage" class="btn-luxury-secondary w-full">
      Découvrir ce service
    </a>
  </CardContent>
</Card>
```

## Design Guidelines

### When to Use Each Variant

**Default Cards:**
- Basic content display
- Non-premium sections
- Utility components

**Luxury Cards:**
- Service listings
- Standard premium content
- General brand-aligned content

**Luxury Featured Cards:**
- Premium services
- Special offers
- Hero content
- Featured testimonials

### Animation Guidelines

- Use `withAnimation={true}` for cards that appear on scroll
- Combine with stagger classes (`.animate-stagger-1`, `.animate-stagger-2`, etc.) for sequential animations
- Add `group` class to parent for coordinated hover effects

### Responsive Behavior

All card components are mobile-first responsive:
- Padding adjusts automatically on mobile
- Typography scales appropriately
- Images maintain aspect ratios
- Touch targets meet accessibility standards

### Accessibility

- Semantic HTML structure maintained
- Proper color contrast ratios
- Focus states included
- Screen reader friendly
- Keyboard navigation support

## Integration with Brand System

These components integrate seamlessly with:
- Brand color palette (brand.css)
- Luxury button system (`.btn-luxury-primary`, `.btn-luxury-secondary`)
- Animation system (luxury animations)
- Typography system (Rouge Script, Palanquin)
- Shadow and spacing systems

## Migration from Legacy Cards

Existing cards using class-based luxury styling can be migrated:

**Before:**
```astro
<div class="card-luxury-featured hover-lift">
  <div class="p-6">
    <h3 class="font-heading text-brand-gold-primary">Title</h3>
    <p class="text-brand-taupe">Description</p>
  </div>
</div>
```

**After:**
```astro
<Card variant="luxury-featured" withHover={true}>
  <CardContent variant="luxury-featured">
    <CardTitle variant="luxury-featured">Title</CardTitle>
    <CardDescription variant="luxury-featured">Description</CardDescription>
  </CardContent>
</Card>
```

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- iOS Safari 12+
- Chrome 80+
- Firefox 80+
- Edge 80+