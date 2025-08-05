import Card from "./Card.astro";
import CardContent from "./CardContent.astro";
import CardDescription from "./CardDescription.astro";
import CardFooter from "./CardFooter.astro";
import CardHeader from "./CardHeader.astro";
import CardTitle from "./CardTitle.astro";
import CardBadge from "./CardBadge.astro";
import CardImage from "./CardImage.astro";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardBadge, CardImage };

export default {
	Root: Card,
	Header: CardHeader,
	Footer: CardFooter,
	Title: CardTitle,
	Description: CardDescription,
	Content: CardContent,
	Badge: CardBadge,
	Image: CardImage,
};
