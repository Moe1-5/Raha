# رحلة الراحة / Rihlat Al Raha — launch design plan

## 1. Scope decision

The first release is a fast, multilingual hotel showcase and reservation-request site. Its job is to help a visitor discover the available hotels, understand the offer, and contact the team immediately through WhatsApp or the listed phone numbers.

The first release is not a full online booking engine, payment flow, customer account system, inventory system, or hotel-management dashboard. Those are phase-two capabilities from the supplied requirements form.

## 2. User request vs. attached-document requirements

### Direct instructions from the user

- Start with the visual direction and plan before implementation.
- Build the site in Arabic, English, and Turkish.
- Arabic campaign imagery may appear in all languages.
- Turkish campaign imagery should appear only in the Turkish experience.
- Use the supplied hotel imagery, campaign creatives, brand direction, locations, social links, and existing site information.
- Prepare the launch around the Saudi National Day campaign period.
- Keep the campaign palette distinct from the permanent product palette.
- Prioritize launch speed and a polished first release.

### Requirements interpreted from the supplied phase-one form

- Brand: شركة رحلة الراحة / Rihlat Al Raha.
- Main purpose: introduce the company, show hotels and offers, and receive a simple reservation request.
- Primary conversion: WhatsApp contact, with phone and email as secondary paths.
- First-release hotel cards/details: فندق فيرتا المحبس and فندق رفاهية الكرام.
- Core hotel information: name, city, location, photos, short description, facilities/services, starting price when confirmed, and a contact/reservation action.
- Main navigation: Home, Hotels, Offers, About, Contact.
- Required footer information: company name, contact details, WhatsApp, social links, email, commercial registration, tax number, and copyright.
- Required devices: desktop, tablet, and mobile.
- Deferred features: online payments, customer accounts, room management, discount codes, reports, admin dashboard, full WhatsApp integration, SMS, external booking integrations, and mobile applications.

The form also contains draft copy and checked items. These are content inputs to validate, not instructions that override the user's explicit three-language and campaign requirements.

## 3. Visual thesis

**Quiet hospitality with a geometric journey.**

The permanent experience should feel calm, trustworthy, and premium: generous cream space, deep coffee typography, olive navigation accents, and geometric line/pattern details derived from the Rihlat Al Raha identity. The seasonal campaign should feel energetic and immediate without turning the entire product into a campaign poster.

The memorable design decision is a thin “journey rail” motif: a restrained geometric line that connects the seasonal offer, hotel cards, and reservation request area. It references the brand’s connected Kufic-inspired system while keeping the interface clean and easy to scan.

## 4. Color architecture

### Permanent system palette — always available

| Token | Hex | Use |
| --- | --- | --- |
| Dark Coffee | `#3D2B1F` | Main text, primary buttons, strong footer surfaces |
| Olive Bark | `#685634` | Navigation, secondary text, borders, icon treatment |
| Soft Fawn | `#E1BB80` | Brand accent, highlights, active states, warm button fill |
| Porcelain | `#FBF8F2` | Main page background and readable content surfaces |
| Ink | `#211810` | High-contrast headings and important numbers |

The permanent palette comes from the supplied brand proposal: Dark Coffee, Olive Bark, and Soft Fawn. It should establish the site’s identity even when no promotion is active.

### Saudi National Day campaign palette — temporary accent layer

| Token | Approximate direction | Use |
| --- | --- | --- |
| Campaign Teal | deep blue-green from the supplied poster | Offer strip, campaign panel, limited hero background |
| Campaign Green | bright Saudi/campaign green from the supplied poster | Offer badge, service icons, limited CTA emphasis |
| Campaign White | white | Campaign text only where contrast is sufficient |
| Campaign Red | supplied red accent | Small urgency mark or offer number, never body text |

Campaign colors should be confined to the campaign rail, offer card, and short-lived promotional state. They should not replace Dark Coffee/Olive Bark in the navigation, hotel details, forms, or footer. The maroon/purple poster variation is an alternate campaign asset, not a second permanent brand theme.

### Umrah / seasonal hospitality palette — content-specific accent

The cream, dark brown, terracotta, and muted gold seen in the supplied Umrah creatives can support a hotel offer card or a campaign detail view. It should remain an offer treatment, not become the global system palette.

## 5. First-screen composition

1. **Slim utility bar**: WhatsApp, Saudi/Türkiye phone numbers, and language switcher.
2. **Brand header**: Rihlat Al Raha logo, navigation, and one clear “Reserve now” action.
3. **Campaign rail**: a compact National Day/September offer with a real image, offer label, and WhatsApp CTA. The rail can be hidden or replaced after the campaign.
4. **Hero message**: a short Arabic-first promise around comfort from the first reservation, with English and Turkish equivalents.
5. **Hotel discovery**: two or three large cards, beginning with Verta Hotel Mahbes and Rafahya Al Karam. Mirage Taiba appears in supplied creatives and must be confirmed as an active launch hotel before it is shown as a bookable listing.
6. **Why choose us**: 24-hour service, free internet, free Haram transfer where confirmed, and organized hospitality/logistics.
7. **Simple reservation request**: hotel, arrival date, departure date, rooms, guests, name, phone, and notes. Submission opens WhatsApp with a prefilled message.
8. **Footer**: contact, social links, legal company data, and the same reservation action.

The first viewport must communicate the offer and let the visitor start a reservation request; it should not be a large decorative poster that delays the main action.

## 6. Language and asset behavior

- Arabic is the default language and uses RTL layout.
- English and Turkish use LTR layout.
- The language switcher updates navigation, labels, form copy, offer copy, metadata, and document direction.
- Arabic poster creatives can appear in all three languages because the target market is Saudi Arabia.
- Turkish poster creatives are filtered to Turkish only.
- Interface copy should be translated as real product copy, not machine-transliterated labels.
- Hotel names may retain their official Arabic/Latin forms where that is the recognizable property name.
- Dates, phone numbers, currency, and WhatsApp message templates should be localized without changing the underlying booking data.

## 7. Content and asset mapping

- `promo.jpeg`, `promo-2.jpeg`, `promo-3.jpeg`, and `promo-4.jpeg`: Saudi National Day campaign variants; use one primary variant in the launch rail and keep the others available for campaign rotation or testing.
- `promo_tyr.jpeg`: Rafahya Al Karam Turkish campaign creative.
- `promo-tyr-2.jpeg`, `promo-tyr-3.jpeg`, and `promo-tyr-4.jpeg`: Turkish Umrah/Mirage Taiba campaign creatives; show only in Turkish after hotel/content confirmation.
- The three WhatsApp creatives: Arabic Umrah/Mirage Taiba campaign creatives; safe for all languages as supplied.
- Hotel/building/room/restaurant images should be used as property imagery where available, with poster creatives kept in promotional placements rather than stretched as the entire interface.

## 8. Launch content baseline

The first campaign message should be based on the supplied “عرض سبتمبر / اليوم الوطني” content, with one canonical number selected before implementation. The current supplied creatives use both 95 and 96 in different places; the implementation should make the number a single campaign content value so it can be corrected once and reflected everywhere.

The launch offer module should communicate, where verified:

- renovated accommodation;
- breakfast;
- 24-hour service;
- free internet;
- free Haram transfer;
- limited-time September/National Day pricing.

No price, distance, star rating, room availability, or service should be presented as factual until confirmed from the current hotel information.

## 9. Implementation sequence

### Phase A — design system and shell

- Create the three-language token system and RTL/LTR layout foundation.
- Add brand logo treatment, favicon, typography, spacing, cards, buttons, form fields, and campaign rail.
- Build the responsive home page with the primary palette and one campaign variant.

### Phase B — hotel and reservation content

- Add the confirmed hotel cards and details.
- Add photo galleries or grouped imagery using the supplied assets.
- Add the reservation-request form and WhatsApp message generation.
- Add contact/footer data and all supplied social links.

### Phase C — launch readiness

- Confirm hotel list, current offer numbers, prices, facilities, phone numbers, and legal footer data.
- Verify Arabic, English, and Turkish copy.
- Verify image filtering by language.
- Test desktop, tablet, mobile, RTL, LTR, keyboard navigation, form validation, and WhatsApp handoff.
- Publish the first release and keep the campaign content easy to replace.

## 10. Decisions to confirm before implementation

1. Is Mirage Taiba an active first-release hotel, or should it remain a Turkish/Arabic campaign reference only?
2. What are the final launch prices, room types, distances, and confirmed facilities for each hotel?
3. Which National Day number and canonical offer wording should replace the mixed 95/96 draft assets?
4. Should the first release use the current Rihlat Al Raha logo from the supplied identity PDF, or is a final logo file available?

