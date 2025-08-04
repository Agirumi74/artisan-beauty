# 🎨 Artisan Beauty - Brand Guidelines & Design System

**Version 1.0 | Production-Ready Luxury Brand Identity**

---

## 📋 Table of Contents

1. [Brand Overview](#brand-overview)
2. [Logo System](#logo-system)
3. [Color Palette](#color-palette)
4. [Typography](#typography)
5. [Iconography](#iconography)
6. [Layout & Spacing](#layout--spacing)
7. [Components](#components)
8. [Photography Style](#photography-style)
9. [Voice & Tone](#voice--tone)
10. [Implementation Guidelines](#implementation-guidelines)

---

## 🌟 Brand Overview

### Brand Essence
**Artisan Beauty** embodies luxury, sophistication, and artistic excellence in the beauty industry. The brand identity reflects the premium nature of professional makeup artistry while maintaining warmth and accessibility.

### Brand Positioning
- **Premium Professional**: High-end makeup services and training
- **Artistic Excellence**: Creative, innovative approach to beauty
- **Personal Touch**: Bespoke, personalized client experience
- **French Elegance**: Sophisticated Annecy-based luxury service

### Target Audience
- **Primary**: Affluent women 25-45 seeking premium beauty services
- **Secondary**: Beauty professionals seeking advanced training
- **Tertiary**: Special occasion clients (weddings, events)

---

## 🎯 Logo System

### Primary Logo
The Artisan Beauty logo features:
- **Custom Icon**: Stylized makeup brush within decorative rings
- **Typography**: "Rouge Script" for elegant script feel
- **Tagline**: "Sublimer votre beauté" (optional display)

### Logo Variants
```
Primary Logo: Icon + Text + Tagline
Secondary Logo: Icon + Text
Icon Only: For small applications
Text Only: For minimal contexts
```

### Logo Sizes
- **Extra Large (xl)**: Hero sections, large displays
- **Large (lg)**: Page headers, primary branding
- **Medium (md)**: Navigation, standard applications
- **Small (sm)**: Minimal spaces, mobile icons

### Usage Guidelines
- **Minimum Size**: 24px height for digital applications
- **Clear Space**: Minimum 2x logo height on all sides
- **Backgrounds**: Works on light backgrounds, avoid busy patterns

---

## 🎨 Color Palette

### Primary Brand Colors

#### Gold Collection
```css
--brand-gold-primary: #C9A96E    /* Warm luxury gold */
--brand-gold-light: #E6D4A6      /* Light champagne */
--brand-gold-dark: #B08D57       /* Deep gold */
--brand-gold-accent: #F4E8D0     /* Soft gold highlight */
```

#### Rose Collection
```css
--brand-rose-primary: #D4A574    /* Dusty rose gold */
--brand-rose-light: #F2E5D7      /* Blush pink */
--brand-rose-dark: #B8956A       /* Deep rose */
--brand-rose-accent: #FBF6F1     /* Rose whisper */
```

### Neutral Palette

#### Luxury Neutrals
```css
--brand-cream: #FAF8F5           /* Warm cream */
--brand-ivory: #FEFCF9           /* Pure ivory */
--brand-taupe: #8B7D6B           /* Sophisticated taupe */
--brand-charcoal: #2A2520        /* Elegant charcoal */
--brand-black: #1A1611           /* Luxe black */
```

#### Supporting Colors
```css
--brand-champagne: #F7F0E6       /* Champagne highlight */
--brand-bronze: #CD7F32          /* Bronze accent */
--brand-pearl: #F8F6F3           /* Pearl white */
--brand-smoke: #4A453F           /* Smoky gray */
```

### Color Usage Rules

1. **Primary Colors**: Use gold and rose for key brand elements
2. **Neutrals**: Cream and ivory for backgrounds, taupe for text
3. **Accents**: Bronze and champagne for highlights and CTAs
4. **Text**: Charcoal for primary text, taupe for secondary

### Accessibility
- All color combinations meet WCAG 2.1 AA standards
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text

---

## ✍️ Typography

### Font Families

#### Primary Heading Font: Rouge Script
- **Usage**: Headlines, titles, brand text
- **Characteristics**: Elegant, script, artistic
- **Weights**: Regular (400)
- **Applications**: H1, H2, brand elements

#### Body Font: Palanquin
- **Usage**: Body text, navigation, UI elements
- **Characteristics**: Clean, modern, readable
- **Weights**: Thin (100), Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700)

#### Accent Font: Palanquin Uppercase
- **Usage**: Categories, labels, CTAs
- **Characteristics**: Wide letter-spacing, sophisticated
- **Style**: Uppercase, increased tracking

### Typography Scale

```css
--text-xs: 0.75rem      /* 12px - Small labels */
--text-sm: 0.875rem     /* 14px - Body small */
--text-base: 1rem       /* 16px - Body text */
--text-lg: 1.125rem     /* 18px - Large body */
--text-xl: 1.25rem      /* 20px - Subtitles */
--text-2xl: 1.5rem      /* 24px - Small headlines */
--text-3xl: 1.875rem    /* 30px - Section titles */
--text-4xl: 2.25rem     /* 36px - Page headlines */
--text-5xl: 3rem        /* 48px - Display text */
--text-6xl: 3.75rem     /* 60px - Hero headlines */
--text-7xl: 4.5rem      /* 72px - Large displays */
```

### Typography Classes

#### Heading Styles
- `.text-hero`: Largest headlines with gradient effect
- `.text-display`: Major page headlines
- `.text-headline`: Section headlines
- `.text-title`: Content titles
- `.text-subtitle`: Supporting headlines

#### Text Treatments
- `.gradient-luxury-text`: Gold gradient text effect
- `.font-heading`: Rouge Script font
- `.font-body`: Palanquin font
- `.font-accent`: Uppercase Palanquin with tracking

---

## 🔮 Iconography

### Icon Style Guidelines
- **Style**: Outline style with sophisticated weight
- **Size**: 16px, 20px, 24px, 32px, 48px standard sizes
- **Colors**: Gold primary, rose secondary, neutral supporting
- **Usage**: Navigation, features, decorative accents

### Signature Icons
- **Makeup Brush**: Primary brand symbol
- **Stars/Sparkles**: Quality and luxury indicators
- **Geometric Shapes**: Modern, clean accents
- **Natural Elements**: Subtle organic touches

### Icon Library
```
💄 Makeup Services
🌟 Quality/Excellence  
🎓 Training/Education
✨ Beauty/Transformation
💎 Premium/Luxury
🌿 Natural/Organic
⭐ Ratings/Reviews
🎭 Artistic/Creative
```

---

## 📐 Layout & Spacing

### Spacing System
```css
--space-xs: 0.25rem     /* 4px */
--space-sm: 0.5rem      /* 8px */
--space-md: 1rem        /* 16px */
--space-lg: 1.5rem      /* 24px */
--space-xl: 2rem        /* 32px */
--space-2xl: 3rem       /* 48px */
--space-3xl: 4rem       /* 64px */
--space-4xl: 6rem       /* 96px */
--space-5xl: 8rem       /* 128px */
```

### Border Radius
```css
--radius-sm: 0.375rem   /* 6px */
--radius-md: 0.5rem     /* 8px */
--radius-lg: 0.75rem    /* 12px */
--radius-xl: 1rem       /* 16px */
--radius-2xl: 1.5rem    /* 24px */
--radius-3xl: 2rem      /* 32px */
--radius-full: 9999px   /* Full round */
```

### Shadow System
```css
--shadow-luxury-soft: 0 4px 20px rgba(201, 169, 110, 0.1)
--shadow-luxury-medium: 0 8px 30px rgba(201, 169, 110, 0.15)
--shadow-luxury-strong: 0 15px 50px rgba(201, 169, 110, 0.2)
--shadow-luxury-inner: inset 0 2px 10px rgba(201, 169, 110, 0.1)
```

### Grid System
- **Container**: Max-width with responsive padding
- **Breakpoints**: Mobile-first responsive design
- **Columns**: Flexible CSS Grid and Flexbox layouts
- **Gutters**: Consistent spacing between elements

---

## 🧩 Components

### Button System

#### Primary Button (`.btn-luxury-primary`)
- **Style**: Gradient background, white text
- **Usage**: Main CTAs, important actions
- **States**: Default, hover, active, disabled

#### Secondary Button (`.btn-luxury-secondary`)
- **Style**: Transparent background, gold border
- **Usage**: Secondary actions, alternative CTAs
- **States**: Default, hover, active, disabled

### Card System

#### Standard Card (`.card-luxury`)
- **Background**: Ivory with subtle border
- **Shadow**: Soft luxury shadow
- **Hover**: Slight elevation increase

#### Featured Card (`.card-luxury-featured`)
- **Background**: Gradient background
- **Border**: Gold accent border
- **Accent**: Top gradient bar

### Navigation
- **Sticky**: Backdrop blur with transparency
- **Hover**: Animated underline effects
- **Mobile**: Collapsible menu with overlay

### Forms
- **Inputs**: Rounded corners, luxury focus states
- **Labels**: Accent font styling
- **Validation**: Color-coded feedback

---

## 📸 Photography Style

### Image Guidelines
- **Style**: High-quality, professional photography
- **Lighting**: Soft, natural lighting preferred
- **Colors**: Warm tones that complement brand palette
- **Composition**: Clean, uncluttered backgrounds

### Treatment
- **Overlays**: Subtle brand color overlays (10-20% opacity)
- **Borders**: Rounded corners with luxury shadows
- **Ratios**: Consistent aspect ratios across sections

### Content Types
- **Hero Images**: Professional portraits, lifestyle shots
- **Service Images**: Detail shots, before/after, process
- **Gallery**: Artistic, high-impact beauty photography
- **Team**: Professional headshots with brand consistency

---

## 🗣️ Voice & Tone

### Brand Voice
- **Sophisticated**: Refined, knowledgeable, professional
- **Warm**: Approachable, caring, personal
- **Confident**: Assured, expert, trustworthy
- **Inspiring**: Aspirational, transformative, empowering

### Language Guidelines
- **French Elegance**: Use of French terms where appropriate
- **Professional**: Technical expertise without jargon
- **Personal**: Direct address, personalized messaging
- **Positive**: Uplifting, encouraging language

### Content Principles
1. **Quality over Quantity**: Curated, meaningful content
2. **Authenticity**: Genuine, honest communication
3. **Education**: Informative, helpful guidance
4. **Inspiration**: Aspirational, beautiful imagery and copy

---

## 🛠️ Implementation Guidelines

### CSS Custom Properties
All brand colors, typography, and spacing are defined as CSS custom properties for consistent implementation.

### Component Classes
Use the predefined component classes for consistent styling:
- `.btn-luxury-primary` / `.btn-luxury-secondary`
- `.card-luxury` / `.card-luxury-featured`
- `.text-hero` / `.text-display` / `.text-title`
- `.section-luxury` / `.section-luxury-accent`

### Animation Guidelines
- **Duration**: 0.3s for interactions, 0.6s for page elements
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth transitions
- **Effects**: Fade, scale, slide animations for luxury feel

### Responsive Design
- **Mobile First**: Design starts with mobile experience
- **Breakpoints**: Standard responsive breakpoints
- **Typography**: Scales appropriately across devices
- **Spacing**: Maintains proportions on all screen sizes

### Accessibility
- **Contrast**: All colors meet WCAG 2.1 AA standards
- **Focus**: Clear focus indicators for navigation
- **Alt Text**: Descriptive alternative text for images
- **Structure**: Semantic HTML with proper heading hierarchy

---

## 📋 Brand Checklist

### Before Launch
- [ ] Logo appears correctly on all pages
- [ ] Color palette is consistently applied
- [ ] Typography hierarchy is maintained
- [ ] All components use luxury styling
- [ ] Photography follows brand guidelines
- [ ] Voice and tone is consistent across content
- [ ] Responsive design works on all devices
- [ ] Accessibility standards are met

### Ongoing Maintenance
- [ ] Regular brand consistency audits
- [ ] New content follows voice guidelines
- [ ] Component updates maintain brand integrity
- [ ] Performance optimization preserves design quality

---

## 📞 Brand Support

For questions about brand implementation or design decisions, refer to this document or contact the design team. This living document should be updated as the brand evolves.

**Document Version**: 1.0  
**Last Updated**: August 2025  
**Next Review**: February 2026

---

*© 2025 Artisan Beauty. All brand guidelines and design elements are proprietary.*