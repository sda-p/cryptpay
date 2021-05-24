	//Wallet interaction script



async function requestAccount() { //Enable Metamask
    await window.ethereum.request({ method: 'eth_requestAccounts' });
}
requestAccount();

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

	//Payment logic variables
var fiatcode = ""; //Selects fiat currency for value conversion
var fiatvalue = 0; //Selects fiat value



	//ERC-20 addresses

//Coin params:

function supportedtokens(chainindex)
{
	switch(chainindex)
	{
		case 1:
			tokenparams = [
							'ethereum','ETH', 'tokenaddr',
							'bitcoin','wBTC', '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
							'tether','USDT', '0xdAC17F958D2ee523a2206206994597C13D831ec7'
						  ];
			break;
		case 250:
			tokenparams = [
							'fantom','FTM', 'tokenaddr',
							'tokencode','tokenname', 'tokenaddr',
							'tokencode','tokenname', 'tokenaddr'
						  ];
			break;
		case 56:
			tokenparams = [
							'tokencode','tokenname', 'tokenaddr',
							'tokencode','tokenname', 'tokenaddr',
							'tokencode','tokenname', 'tokenaddr'
						  ];
			break;
		case default:
			//error
			
	}
}



		//Drop-down list
var select = document.getElementById('tokenselect');
select.onclick = function() { //Create drop-down list of selected items
 for (var x=0; x<tokenparams.length/3; x++)	{ //Iterate through every set of coin parameters
 		var option=document.createElement("option");
		option.value=x; //Set coin index
		option.text=tokenparams[x+1];
		
		select.appendChild(option);		
 }
}




	//ERC-20 ABI
const ercabi = [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"}],"name":"reclaimToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

	//Contract object
const erc20 = new ethers.Contract(tokenaddr, ercabi, signer);

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

