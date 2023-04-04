export default function StorePlayerCard() {
    return (<div tabIndex={0} className="collapse collapse-arrow card card-compact w-80 h-102 shadow-xl p-5" data-theme="scroll">
    <figure>
      <img src="http://clipart-library.com/img/1751890.png" alt="axxcar player" data-theme="scroll"/>
    </figure>
    <div className="card-actions justify-end">
      <button className="btn btn-primary m-6">Buy Now</button>
    </div>
    <div className="collapse-title text-xl font-medium card-body" >  
      <h2 className="card-title" data-theme="scroll">#4124 AXXCAR</h2>
      <p>0.001 ETH</p>
      
    </div>
    <div className="collapse-content pt-5 pb-0"> 
      <h2 className="font-bold">Attributes</h2>
      <div className="grid gap-x-48 grid-cols-2">
        <div>Status: </div>
        <div>Idle</div>
        <div>Attack: </div>
        <div>35</div>
        <div>HP: </div>
        <div>200</div>
        <div>Items: </div>
        <div>Sword</div>
        <div>Wins: </div>
        <div>12</div>
      </div>
      <div>
        
      </div>
    </div>
</div>);
}
