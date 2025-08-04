# 🧩 Artisan Beauty - Component Library

**Luxury Design System Components for Production Use**

---

## 📋 Component Overview

This document provides implementation details for all luxury design components used in the Artisan Beauty website. Each component follows the brand guidelines and maintains consistency across the site.

---

## 🎨 Design Tokens

### Core Design Tokens
All components use the design tokens defined in `/src/styles/brand.css`:

```css
/* Colors */
--brand-gold-primary: #C9A96E
--brand-rose-primary: #D4A574
--brand-cream: #FAF8F5
--brand-ivory: #FEFCF9
--brand-charcoal: #2A2520

/* Typography */
--text-hero: 3.75rem
--text-display: 3rem
--text-title: 1.875rem
--text-subtitle: 1.25rem

/* Spacing */
--space-md: 1rem
--space-lg: 1.5rem
--space-xl: 2rem
--space-2xl: 3rem

/* Shadows */
--shadow-luxury-soft: 0 4px 20px rgba(201, 169, 110, 0.1)
--shadow-luxury-medium: 0 8px 30px rgba(201, 169, 110, 0.15)
```

---

## 🏗️ Layout Components

### Container
**Purpose**: Main content wrapper with responsive padding

```css
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 1200px;
}

@media (min-width: 1024px) {
  .container {
    padding: 0 2rem;
  }
}
```

### Section Layouts

#### `.section-luxury`
Standard content section with neutral background
```css
.section-luxury {
  padding: var(--space-4xl) 0;
  background: var(--brand-ivory);
}
```

#### `.section-luxury-accent`
Accent section with warm gradient background
```css
.section-luxury-accent {
  background: var(--gradient-luxury-warm);
  padding: var(--space-5xl) 0;
}
```

#### `.section-luxury-hero`
Hero section with premium gradient and decorative elements
```css
.section-luxury-hero {
  background: var(--gradient-luxury-hero);
  padding: var(--space-5xl) 0;
  position: relative;
  overflow: hidden;
}
```

---

## 🎯 Navigation Components

### LuxuryLogo Component
**File**: `/src/components/LuxuryLogo.astro`

#### Props
```typescript
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'light' | 'dark';
  showTagline?: boolean;
}
```

#### Usage Examples
```astro
<!-- Standard navigation logo -->
<LuxuryLogo size="md" showTagline={false} />

<!-- Hero logo with tagline -->
<LuxuryLogo size="xl" showTagline={true} />

<!-- Small mobile logo -->
<LuxuryLogo size="sm" showTagline={false} />
```

### Navbar Component
**File**: `/src/components/Navbar.astro`

#### Features
- Sticky navigation with backdrop blur
- Responsive mobile menu
- Animated hover effects
- Scroll-based transparency changes

#### Structure
```astro
<nav class="bg-luxury-neutral/95 backdrop-blur-md sticky top-0 z-50">
  <div class="container mx-auto">
    <!-- Logo -->
    <LuxuryLogo />
    
    <!-- Desktop Navigation -->
    <ul class="hidden md:flex">
      <!-- Navigation items with hover animations -->
    </ul>
    
    <!-- CTA Button -->
    <a href="/reservations" class="btn-luxury-primary">Réserver</a>
  </div>
</nav>
```

---

## 🔘 Button Components

### Primary Button
**Class**: `.btn-luxury-primary`

#### Styling
```css
.btn-luxury-primary {
  background: var(--gradient-luxury-primary);
  color: var(--brand-ivory);
  border: none;
  border-radius: var(--radius-lg);
  padding: var(--space-md) var(--space-xl);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  box-shadow: var(--shadow-luxury-medium);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
}

.btn-luxury-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-luxury-strong);
}
```

#### Usage
```html
<a href="/reservations" class="btn-luxury-primary">
  Réserver une séance
</a>
```

### Secondary Button
**Class**: `.btn-luxury-secondary`

#### Styling
```css
.btn-luxury-secondary {
  background: transparent;
  color: var(--brand-gold-primary);
  border: 2px solid var(--brand-gold-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-md) var(--space-xl);
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.btn-luxury-secondary:hover {
  background: var(--brand-gold-primary);
  color: var(--brand-ivory);
  transform: translateY(-1px);
}
```

#### Usage
```html
<a href="#services" class="btn-luxury-secondary">
  Découvrir nos services
</a>
```

---

## 🃏 Card Components

### Standard Card
**Class**: `.card-luxury`

#### Styling
```css
.card-luxury {
  background: var(--brand-ivory);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-luxury-soft);
  border: 1px solid var(--brand-champagne);
  transition: all 0.3s ease;
  overflow: hidden;
}

.card-luxury:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-luxury-medium);
}
```

#### Usage
```html
<div class="card-luxury p-6">
  <h3 class="text-xl font-heading text-luxury-primary mb-3">Service Title</h3>
  <p class="text-luxury-light mb-6">Service description...</p>
  <a href="#" class="btn-luxury-secondary">En savoir plus</a>
</div>
```

### Featured Card
**Class**: `.card-luxury-featured`

#### Styling
```css
.card-luxury-featured {
  background: var(--gradient-luxury-soft);
  border: 2px solid var(--brand-gold-light);
  position: relative;
}

.card-luxury-featured::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-luxury-primary);
}
```

#### Usage
```html
<div class="card-luxury-featured p-6">
  <h3 class="text-xl font-heading text-luxury-primary">Premium Service</h3>
  <p class="text-luxury-light">Premium service description...</p>
</div>
```

---

## ✍️ Typography Components

### Heading Classes

#### Hero Text
```css
.text-hero {
  font-size: var(--text-6xl);
  line-height: var(--leading-tight);
  font-weight: var(--font-normal);
  background: var(--gradient-luxury-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

#### Display Text
```css
.text-display {
  font-size: var(--text-5xl);
  line-height: var(--leading-tight);
  color: var(--brand-charcoal);
}
```

#### Section Titles
```css
.text-title {
  font-size: var(--text-3xl);
  line-height: var(--leading-snug);
  font-weight: var(--font-medium);
  color: var(--brand-charcoal);
}
```

#### Subtitles
```css
.text-subtitle {
  font-size: var(--text-xl);
  line-height: var(--leading-relaxed);
  font-weight: var(--font-light);
  color: var(--brand-taupe);
  letter-spacing: var(--tracking-wide);
}
```

### Font Classes

#### Font Families
```css
.font-heading {
  font-family: "Rouge Script", cursive;
  letter-spacing: var(--tracking-wide);
}

.font-body {
  font-family: "Palanquin", sans-serif;
  letter-spacing: var(--tracking-normal);
}

.font-accent {
  font-family: "Palanquin", sans-serif;
  font-weight: var(--font-light);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
}
```

#### Gradient Text
```css
.gradient-luxury-text {
  background: var(--gradient-luxury-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 🎭 Decorative Components

### Luxury Divider
**Class**: `.luxury-divider`

#### Styling
```css
.luxury-divider {
  height: 1px;
  background: var(--gradient-luxury-primary);
  margin: var(--space-2xl) auto;
  max-width: 200px;
  position: relative;
}

.luxury-divider::before {
  content: '✦';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--brand-ivory);
  color: var(--brand-gold-primary);
  padding: 0 var(--space-md);
  font-size: var(--text-lg);
}
```

#### Usage
```html
<div class="luxury-divider"></div>
```

---

## 🎬 Animation Components

### Animation Classes

#### Fade In
```css
@keyframes luxury-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-luxury-fade-in {
  animation: luxury-fade-in 0.6s ease-out;
}
```

#### Scale In
```css
@keyframes luxury-scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-luxury-scale-in {
  animation: luxury-scale-in 0.5s ease-out;
}
```

#### Slide In
```css
@keyframes luxury-slide-in {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-luxury-slide-in {
  animation: luxury-slide-in 0.7s ease-out;
}
```

#### Usage with Delays
```html
<div class="animate-luxury-fade-in" style="animation-delay: 0.3s;">
  Content appears with delay
</div>
```

---

## 🌈 Utility Classes

### Background Colors
```css
.bg-luxury-primary { background: var(--brand-gold-primary); }
.bg-luxury-secondary { background: var(--brand-rose-primary); }
.bg-luxury-accent { background: var(--brand-champagne); }
.bg-luxury-neutral { background: var(--brand-cream); }
```

### Text Colors
```css
.text-luxury-primary { color: var(--brand-gold-primary); }
.text-luxury-secondary { color: var(--brand-rose-primary); }
.text-luxury-dark { color: var(--brand-charcoal); }
.text-luxury-light { color: var(--brand-taupe); }
```

### Borders and Shadows
```css
.border-luxury { border-color: var(--brand-gold-light); }
.shadow-luxury { box-shadow: var(--shadow-luxury-medium); }
```

---

## 📱 Responsive Design

### Breakpoint System
```css
/* Mobile First Approach */
/* xs: 0px and up */
/* sm: 640px and up */
/* md: 768px and up */
/* lg: 1024px and up */
/* xl: 1280px and up */
```

### Responsive Typography
```css
@media (max-width: 768px) {
  .text-hero {
    font-size: var(--text-4xl);
  }
  
  .text-display {
    font-size: var(--text-3xl);
  }
  
  .text-headline {
    font-size: var(--text-2xl);
  }
}
```

### Responsive Spacing
```css
@media (max-width: 768px) {
  .section-luxury,
  .section-luxury-accent,
  .section-luxury-hero {
    padding: var(--space-2xl) 0;
  }
}
```

---

## 🛠️ Implementation Guidelines

### Component Usage Checklist
- [ ] Use semantic HTML structure
- [ ] Apply appropriate ARIA labels
- [ ] Include focus states for interactive elements
- [ ] Test with screen readers
- [ ] Validate color contrast ratios
- [ ] Ensure responsive behavior
- [ ] Optimize for performance

### Best Practices

#### CSS Organization
1. Use CSS custom properties for consistency
2. Group related styles together
3. Comment complex animations
4. Maintain specificity hierarchy

#### Performance
1. Minimize CSS bundle size
2. Use efficient selectors
3. Optimize animation performance
4. Lazy load non-critical styles

#### Accessibility
1. Maintain semantic HTML structure
2. Provide keyboard navigation
3. Include screen reader support
4. Test with accessibility tools

---

## 🔄 Component Lifecycle

### Adding New Components
1. Follow existing naming conventions
2. Use established design tokens
3. Document usage examples
4. Test responsive behavior
5. Validate accessibility

### Updating Components
1. Maintain backward compatibility
2. Update documentation
3. Test across all breakpoints
4. Verify brand consistency

### Deprecating Components
1. Mark as deprecated in code
2. Provide migration path
3. Update documentation
4. Plan removal timeline

---

## 📞 Support & Maintenance

### Code Review Checklist
- [ ] Follows brand guidelines
- [ ] Uses design tokens consistently
- [ ] Responsive across all breakpoints
- [ ] Accessible to all users
- [ ] Performant and optimized
- [ ] Well documented

### Regular Maintenance
- Monthly design system audit
- Quarterly performance review
- Biannual accessibility assessment
- Annual brand guideline review

---

*This component library is a living document that evolves with the Artisan Beauty brand. Always refer to the latest version for implementation guidance.*

**Last Updated**: August 2025  
**Version**: 1.0