import ListingCard from "./listingCard";

export default function Marketplace() {
    return (
    <div>
        <div className="btn-group">
            <input type="radio" name="options" data-title="Buy" className="btn" checked/>
            <input type="radio" name="options" data-title="Sell" className="btn"/>
        </div>
        <div className="grid grid-cols-3 pt-16 px-36 gap-20 relative">
            <ListingCard listingAddress="hi"/>
            <ListingCard listingAddress="hi"/>
            <ListingCard listingAddress="hi"/>
            <ListingCard listingAddress="hi"/>
            <ListingCard listingAddress="hi"/>
            <ListingCard listingAddress="hi"/>
            <ListingCard listingAddress="hi"/>
            <ListingCard listingAddress="hi"/>
            <ListingCard listingAddress="hi"/>
            <ListingCard listingAddress="hi"/>
            <ListingCard listingAddress="hi"/>
            <ListingCard listingAddress="hi"/>
        </div>
    </div>);
}