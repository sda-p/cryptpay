	//Wallet interaction script

async function requestAccount() { //Enable Metamask
    await window.ethereum.request({ method: 'eth_requestAccounts' });
}
requestAccount();

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

	//Payment logic variables

var tokencode = ""; //Selects which coin is paid in
var fiatcode = ""; //Selects fiat currency for value conversion
var fiatvalue = 0; //Selects fiat value



	//ERC-20 addresses

let validchains = new Map([ //Links supported chains to 2d array position of coin parameters
	['1', 1],
	//['47', 2]
]);
//if validchain.get(string(chainid)) != null{} //Check that chain is supported
//chainindex = validchains.get(string(chainid));	//Get array index for chain


//Coin params:
/*	
	tokenparamseth[1] = ['tokencode', 'tokenname', 'tokenaddr'];
	switch case:
		chainindex = 1
			tokenparams = [
								'tokencode','tokenname', 'tokenaddr',
								'tokencode','tokenname', 'tokenaddr',
								'tokencode','tokenname', 'tokenaddr'
							 ];
*/


var select = document.getElementById('tokenselect');
select.onclick = function() { //Create drop-down list of selected items
 for (var x=0; x<tokenparams.length/3; x++)	{ //Iterate through every set of coin parameters
 		var option=document.createElement("option");
		option.value=x; //Set coin index
		option.text=tokenparams[x+1];
		
		select.appendChild(option);		
 }	
}

//Drop-down list




	//ERC-20 ABI


	//Contract object


	//Conversion rate

//var request = new XMLHttpRequest();
//request.open("GET", "...");
//https://api.coingecko.com/api/v3/simple/price?ids= [token] &vs_currencies= [fiat] //Coingecko's API call
//request.send

//request.onload = () => { coincrate = JSON.parse(request.response)[token][fiat]; //Token's value in fiat currency



//pvalue = fiatam/coincrate/unitmag; //Payment value in token units

//ownbal = await provider.getBalance(ownaddr); //Get native token balance

//ownbal = await erctoken.balanceOf(ownaddr); //Get ERC-20 balance

//if (ownbal.toNumber() < pvalue)	//Make sure ERC-20 balance is sufficient

									//For native token do this after subtracting payment amount
//if (gasfee.toNumber() < ownbal)	//Make sure there is enough balance for gas

//pdisplay.innerHTML = Math.floor(pvalue*100)/100 + " " + tokenname; //Display price

//pdisplay.innerHTML = pdisplay.innerHTML + "<br>Insufficient balance."; //If balance check fails


			//Style payment button for off
//document.getElementById("paybtn").style.cursor = "not-allowed";
//document.getElementById("paybtn").style.background = disablecol;
//document.getElementById("paybtn").style.borderColor = disablecol;
			//Style payment button for on
//document.getElementById("paybtn").style.cursor = "pointer";
//document.getElementById("paybtn").style.background = enablecol;
//document.getElementById("paybtn").style.borderColor = enablecol;



async function cryptpay() {}	//Unified payment function
			//Native token transaction
/*let tx = signer.sendTransaction({
                        to: destinationaddr,
                        value: ethers.utils.parseEther(String(pvalue))
                }).then((result) => {

				txhash = result.hash;
                console.log(result);
                console.log(result.hash);
                //receipt(result.hash);
                var txobj = result;
                console.log("aaaa ", txhash);
                var rcptshow = 0;
                setInterval(async function(){   //Check for confirmations
                        txobj = await provider.getTransactionReceipt(txhash);
                        console.log(txobj);
                        console.log(txobj.blockNumber);
                        if(txobj.blockNumber)
                        {
                                if (rcptshow==0)
                                {
                                rcptshow=1;
                                receipt(txhash);
                                }
                        }

                }, 3000);
                });
*/

			//ERC-20 transfer
/*
let tx = wbtc.transfer(destinationaddr, tokenam).then((result) => {
                txhash = result.hash;
                console.log(result);
                console.log(result.hash);
                //receipt(result.hash);

                var txobj = result;
                console.log("aaaa ", txhash);
                var rcptshow = 0;
                setInterval(async function(){   //Check for confirmations
                        txobj = await provider.getTransactionReceipt(txhash);
                        console.log(txhash);
                        console.log(txobj);
                        console.log(txobj.blockNumber);

                        if(txobj.blockNumber)
                        {
                                if (rcptshow==0)
                                {
                                rcptshow=1;
                                receipt(txhash);
                                }
                        }

                }, 3000);
                });

*/

function receipt(hash) {} //Generate HTML receipt
/*
document.getElementById("txblock").innerHTML = hash;

if (pindex==1) {
document.getElementById("cname").innerHTML = pvalue + " ETH";
}
if (pindex==2) {
document.getElementById("cname").innerHTML = pvalue + " wBTC";
}
if (pindex==3) {
document.getElementById("cname").innerHTML = pvalue + " USDT";
}
var ctime = new Date();
ctime.getTime();
document.getElementById("ctime").innerHTML = ctime.toTimeString();


document.getElementById("wholescreen").classList.toggle("show");
}

function clreceipt() {
document.getElementById("wholescreen").classList.toggle("show");
*/

