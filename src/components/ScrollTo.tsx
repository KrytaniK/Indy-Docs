export default function ScrollTo({ index, elementID, children }: { index: number, elementID: string, children: any }) {

    function ScrollToElement(id: string) {
            
        const element = document.getElementById(id);
        
        if (!element) {
            console.error(`Element not found with id: ${id}`);
            return;
        }
        
        element.scrollIntoView({behavior: "smooth", block: "center"});
    }

    return <div tabIndex={0} id={`tocIndex-${index}`} style={{cursor: "pointer"}} onClick={() => ScrollToElement(elementID)}>{children}</div>
}