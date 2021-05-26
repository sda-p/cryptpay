import {ethers} from "./ethers-5.2.esm.min.js"; // Import ethers locally if running from node.js server

var fiatCode = "gbp"; //Selects fiat currency for value conversion
var fiatValue = 30; //Selects fiat value
var destinationaddr = "0x6297699E055d52501848367Cf3E16C6ddd489FAa";



//Global variables
let provider;
let signer;
var walletConnected;



async function payWithCrypto(){
	//Set up the payment environment
	paymentEnv();	
}


async function paymentEnv() {
	var walletConnected=0;
	//Style pay button for UX
	document.getElementById('paybtn').style.cursor = "not-allowed";
	document.getElementById('paybtn').style.background = "#666666";
	document.getElementById('paybtn').style.borderColor = "#666666";
	//Connect wallet on mouse hover
	document.getElementById('cryptPay').addEventListener("click", connectWallet);
}
paymentEnv();

// Wallet Integration
async function connectWallet() {

	//Run once
	if (!walletConnected)
	{
    // Web3 Wallet Connection
    async function requestAccount() { 
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

	requestAccount();
	
    // Get provider from any network and refresh page on change.
    provider = new ethers.providers.Web3Provider(window.ethereum, "any") || new ethers.providers.JsonRpcProvider();
    provider.on("network", (newNetwork, oldNetwork) => {
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        if (oldNetwork) {
            window.location.reload();
        }
    });

    // Fetch a signer for signing txns and making things happen on blockchain.
    signer = provider.getSigner();
    
    //tokenparams=[0];
	supportedtokens();
	}
	walletConnected=1;
}




//Global vars for testing


	
// Check supported chain
//{ //On "select token" click
	async function supportedtokens() //Sets the token parameters array for each chain ID
	{
		var payAllowed;
		var tokenparams;
		var tokenindex;
		var chainindex = await provider.getNetwork();
		switch(chainindex.chainId)
		{
			case 1:
				tokenparams = [
								'ethereum','ETH', '18',
								'bitcoin','wBTC', '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
								'tether','USDT', '0xdAC17F958D2ee523a2206206994597C13D831ec7',
								'dai', 'DAI', '0x6B175474E89094C44Da98b954EedeAC495271d0F',
								'usd-coin', 'USDC', '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
							  ];
				break;
			case 250:
				tokenparams = [
								'fantom','FTM', '18',
								'spookyswap','BOO', '0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE',
								'usd-coin', 'USDC', '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75'
							  ];
				break;
			case 56:
				tokenparams = [
								'binancecoin','BNB', '8',
								'binance-usd','BUSD', '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
								'usd-coin', 'USDC', '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
							  ];
				break;
			case 4002:
				tokenparams = [
								'fantom','FTM', '18'
							  ];
				break;
				
			default:
				alert("Unsupported network. Please switch to Ethereum, Fantom, or Binance Smart Chain.");
				break;
				//error
				
		}
		//Populate token list
		var select = document.getElementById('tokenselect');
		var convpvalue;
		select.addEventListener("click", async function()		//On token selection
		{
			var erc20; //Erc-20 contract object
			//Construct a contract object to retrieve parameters
			const ercabi = [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"}],"name":"reclaimToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
			//Query decimal places for value conversion
	
			let big10 = ethers.BigNumber.from(10); //To avoid power overflow
			var ownaddr = window.ethereum.selectedAddress; //grab own address for balance checks
			
			//Get dropdown item #
			var tokenindex = select.value;
			async function coingeckoFiatRate(tokenName, fiatCode, tokenindex)
			{
					var coincrate; //Coin conversion rate
			        // Somehow hook the JSON from here
			        var request = new XMLHttpRequest();
			        request.open("GET", "https://api.coingecko.com/api/v3/simple/price?ids=" + tokenName + "&vs_currencies=" + fiatCode);
			        request.send();
			        request.onload = async () => {
			        	coincrate = JSON.parse(request.response)[tokenName][fiatCode];
			        	//Calculate price conversion, display payment value, check user balance, enable button if >, call tx on click

			        	var pvalue = fiatValue/coincrate; //Human-readable payment amount
			        	var pdisplay = document.getElementById("pdisplay"); //Payment value display
			        	pdisplay.innerHTML = pvalue + " " + tokenparams[parseInt(tokenindex)*3+1]; //Display payment amount
			        	if (tokenindex=="")
			        	{
			        	  		pdisplay.innerHTML = "";
			        	}
			        	//Receipt function
			        	function receipt(hash)
			        	{
							document.getElementById("txblock").innerHTML = hash; //Display transaction hash
							document.getElementById("cname").innerHTML = pvalue + " " + tokenparams[parseInt(tokenindex)*3+1]; //Display transaction price
							var ctime = new Date();
							ctime.getTime();
							document.getElementById("ctime").innerHTML = ctime.toTimeString(); //Display time
							document.getElementById("wholescreen").style.display = "block";
							
							
			        	}
						if (parseInt(tokenindex)==0)
							    {
							    	var decimals = tokenparams[2]; //Grab decimal places from array
							    	//Automatically truncate payment value for greatest accuracy
									//ar pratio = Math.floor(1/pvalue);
							    	
							    	convpvalue = ethers.BigNumber.from(Math.floor(pvalue*1000000000)).mul(big10.pow(decimals)).div(1000000000); //Value in logical coin amount
							    	let gascost;
							    	let tx = {
							    		to: destinationaddr,
							    		value: ethers.utils.parseEther(String(Math.floor(pvalue*1000000)/1000000))
							    	}
							    	//!Add loading wheel between async wait functions
							    	provider.estimateGas(tx).then(async function(estimate) {
										var gasPrice = await provider.getGasPrice();
										tx.gasLimit = estimate;
							    		//tx.gasPrice; //Not sure if this is set automatically or not
							    		gascost = tx.gasLimit.mul(gasPrice); //Total cost for gas
							    		let ownbal = await provider.getBalance(ownaddr); //Get native toke balance
							    		if (ownbal.gt(gascost.add(convpvalue)))
							    		{
							    			payAllowed = 1;
							    			document.getElementById('paybtn').style.cursor = "pointer";
							    			document.getElementById('paybtn').style.background = "#e82561";
							    			document.getElementById('paybtn').style.borderColor = "#e82561";
							    			//Style button for payment
							    			document.getElementById('paybtn').addEventListener("click", async function() { //Pay on button click
							    				if (payAllowed == 1)
							    				{	var rcptshow = 0;
							    					let tx = signer.sendTransaction({
							    					to: destinationaddr,
							    					value: ethers.utils.parseEther(String(pvalue))
							    					}).then((result) => {
							    										
							    						var txhash = result.hash;
							    						//receipt(result.hash);
							    						var txobj = result;
							    						var rcptshow = 0;
							    							setInterval(async function(){   //Check for confirmations
							    							txobj = await provider.getTransactionReceipt(txhash);
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
							    			    }
							    			});
							    		} else {
							    			payAllowed = 0;
							    			document.getElementById('paybtn').style.cursor = "not-allowed";
							    			document.getElementById('paybtn').style.background = "#666666";
							    			document.getElementById('paybtn').style.borderColor = "#666666";
											pdisplay.innerHTML = pdisplay.innerHTML + "<br>Insufficient balance.";
							    			//Style button to gray
							    		}
							    	});
							    	;
							    	//Calculate for price + gas
							    	
							    } else {
							    	
							        var tokenaddr = tokenparams[tokenindex*3+2]; //Get token address
							        var erc20 = new ethers.Contract(tokenaddr, ercabi, signer);
							        var decimals = await erc20.decimals(); //Get decimal places
							        var convpvalue = ethers.BigNumber.from(Math.floor(pvalue*1000000)).mul(big10.pow(decimals)).div(1000000); //Value in logical coin amount
							        var ownbal = await erc20.balanceOf(ownaddr);
							    	//Calculate gas and price separately
							    	if (ownbal.gt(convpvalue))
							    	{
							    		payAllowed = 1;
							    		document.getElementById('paybtn').style.cursor = "pointer";
							    		document.getElementById('paybtn').style.background = "#e82561";
							    		document.getElementById('paybtn').style.borderColor = "#e82561";
							    		//Style button for payment
							    		document.getElementById('paybtn').addEventListener("click", async function() { //Pay on button click
											if (payAllowed == 1)
											{
												let tx = erc20.transfer(destinationaddr, convpvalue).then((result) => {
													var txhash = result.hash;
													//receipt(result.hash);
												
													var txobj = result;
													var rcptshow = 0;
													setInterval(async function(){   //Check for confirmations
													txobj = await provider.getTransactionReceipt(txhash);
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
											}
											
							    			
							    		});
							    	} else {
							    		payAllowed = 0;
							    		document.getElementById('paybtn').style.cursor = "not-allowed";
							    		document.getElementById('paybtn').style.background = "#666666";
							    		document.getElementById('paybtn').style.borderColor = "#666666";
										pdisplay.innerHTML = pdisplay.innerHTML + "<br>Insufficient balance.";
							    		//Style button to grey
							    	}
							    }
							        
						//a
						
			        	
			        }
			        	
			}
			coingeckoFiatRate(tokenparams[tokenindex*3], fiatCode, tokenindex);
			
		});
						
		function popList() {
			for (var x=0; x<tokenparams.length/3; x++)	{ //Iterate through every set of coin parameters
					 var option=document.createElement("option");
					 option.value=x; //Set coin index
					 option.text=tokenparams[x*3+1];
							
					 select.appendChild(option);		
				}
		}
		
		popList();

		
		return tokenparams;
	}

function clreceipt() {
	document.getElementById("wholescreen").style.display = "none";
}
window.clreceipt = clreceipt;
document.getElementById('closewin').addEventListener("click", clreceipt()); //Close receipt
