const scriptConfig = { 
		inverterIpAddress: '192.168.0.109', 
		gwidth: 200, 
		gheight: 120, 
		pfs1limit: 300, 
		pfs2limit: 1000, 
		pfs3limit: 4000, 
		pfs4limit: 8000, 
		pfs1colour: '#99ff33', 
		pfs2colour: '#66cc00', 
		pfs3colour: '#4d9900', 
		pfs4colour: '#336600', 
		pfg1limit: 300, 
		pfg2limit: 1000, 
		pfg3limit: 4000, 
		pfg4limit: 8000, 
		pfg1colour: '#ff9999', 
		pfg2colour: '#ff0000', 
		pfg3colour: '#b81414', 
		pfg4colour: '#660000' 
};

var web;
var runningInForeground = true;

// Layouts
var layConfig;

// Controls
var ipAddEdt;
var otcHeightEdt;
var gWidthEdt;
var gHeightEdt;
var pfs1LimitEdt;
var pfs2LimitEdt;
var pfs3LimitEdt;
var pfs4LimitEdt;
var pfg1LimitEdt;
var pfg2LimitEdt;
var pfg3LimitEdt;
var pfg4LimitEdt;
var bgndChk;

var txtError;
var fCfg = "froniusConfig";
var chartTimer;

// Defaults
var ipAddDef = "192.168.0.109";
var otcHeightDef = "300px";
var gWidthDef = "200";
var gHeightDef = "120";
var pfs1LimitDef = "300";
var pfs2LimitDef = "1000";
var pfs3LimitDef = "4000";
var pfs4LimitDef = "8000";
var pfg1LimitDef = "300";
var pfg2LimitDef = "1000";
var pfg3LimitDef = "4000";
var pfg4LimitDef = "8000";

var otcHeightNew = "";
var gWidthNew = "";
var gHeightNew = "";
var pfs1LimitNew = "";
var pfs2LimitNew = "";
var pfs3LimitNew = "";
var pfs4LimitNew = "";
var pfg1LimitNew = "";
var pfg2LimitNew = "";
var pfg3LimitNew = "";
var pfg4LimitNew = "";

//Called when application is started.
function OnStart()
{
		

    layMain = app.CreateLayout( "linear", "Top,Center"); //"VCenter,FillXY" );

    web = app.CreateWebView( 1.0, 0.9 );
    web.SetBackColor( "#3E424B"); //353839"); //2A3439" );
    layMain.AddChild( web );


layNav = app.CreateLayout( "Linear", "Horizontal"); //"Vertical" );
 //layDark.SetPadding( 0, 0, 0, 0.05 );
  layMain.AddChild( layNav );
  
  btnConfig = app.AddButton( layNav, "Configuration",  0.2, -1, "Alum" );
  btnConfig.SetOnTouch( btnConfig_OnTouch );
  
btnEventLog = app.AddButton( layNav, "Event Log",  0.2, -1, "Alum" );

txtError = app.CreateText( "[fa-exclamation-circle] Can't find inverter, check IP Address", 0.4, -1, "FontAwesome" )
//	txt.SetTextSize( txtSize )
//	txt.SetOnTouch( OnTouch )
txtError.SetVisibility("Hide");
	layNav.AddChild( txtError )
   
,    // Configuration layout
  	layConfig = app.CreateLayout( "Linear", "FillXY" )
		layConfig.SetPadding( 0, 0.1, 0, 0 ) 
		layConfig.SetBackground( "/Sys/Img/GreenBack.jpg" )
		layConfig.SetVisibility( "Hide" )

   // Configuration - Header
 	layConfigT = app.CreateLayout( "Linear", "Horizontal,Top" )
		layConfig.AddChild( layConfigT )
    
    btnBack = app.CreateButton( "Back to main", 0.3, 0.06, "gray" )
		btnBack.SetOnTouch( btnBack_OnTouch )
		layConfigT.AddChild( btnBack )

		btnRestore = app.CreateButton( "Restore to default", 0.3, 0.06, "gray" )
		btnRestore.SetOnTouch( btnRestore_OnTouch )
		layConfigT.AddChild( btnRestore )
				
		// Configuration - Layout
		layConfigH = app.CreateLayout( "Linear", "Horizontal" ); layConfig.AddChild( layConfigH );
		layConfig1 = app.CreateLayout( "Linear", "Left,Vertical" ); layConfigH.AddChild( layConfig1 );
    layConfig2 = app.CreateLayout( "Linear", "Vertical" ); layConfigH.AddChild( layConfig2 );
		
		// Configuration - Controls
		txt = app.CreateText( "IP Address", 0.3, 0.05, "Right" ); txt.SetTextSize( 16 ); layConfig1.AddChild( txt );
    txt2 = app.CreateText( "Over Time Chart Height", 0.3, 0.05, "Right" ); txt2.SetTextSize( 16 ); layConfig1.AddChild( txt2 );
    txt3 = app.CreateText( "Gauges Width (px)", 0.3, 0.05, "Right" ); txt3.SetTextSize( 16 ); layConfig1.AddChild( txt3 );
    txt4 = app.CreateText( "Gauges Height (px)", 0.3, 0.05, "Right" ); txt4.SetTextSize( 16 ); layConfig1.AddChild( txt4 );
    txt5 = app.CreateText( "Power From Solar Limit 1 (W)", 0.3, 0.05, "Right" ); txt5.SetTextSize( 16 ); layConfig1.AddChild( txt5 );
    txt6 = app.CreateText( "Power From Solar Limit 2 (W)", 0.3, 0.05, "Right" ); txt6.SetTextSize( 16 ); layConfig1.AddChild( txt6 );
    txt7 = app.CreateText( "Power From Solar Limit 3 (W)", 0.3, 0.05, "Right" ); txt7.SetTextSize( 16 ); layConfig1.AddChild( txt7 );
    txt8 = app.CreateText( "Power From Solar Limit 4 (W)", 0.3, 0.05, "Right" ); txt8.SetTextSize( 16 ); layConfig1.AddChild( txt8 );
    txt9 = app.CreateText( "Power From Grid Limit 1 (W)", 0.3, 0.05, "Right" ); txt9.SetTextSize( 16 ); layConfig1.AddChild( txt9 );
    txt10 = app.CreateText( "Power From Grid Limit 2 (W)", 0.3, 0.05, "Right" ); txt10.SetTextSize( 16 ); layConfig1.AddChild( txt10 );
    txt11 = app.CreateText( "Power From Grid Limit 3 (W)", 0.3, 0.05, "Right" ); txt11.SetTextSize( 16 ); layConfig1.AddChild( txt11 );
    txt12 = app.CreateText( "Power From Grid Limit 4 (W)", 0.3, 0.05, "Right" ); txt12.SetTextSize( 16 ); layConfig1.AddChild( txt12 );
    
		  
		ipAddEdt = app.CreateTextEdit( app.LoadText( "ipAddress", ipAddDef, fCfg ), 0.2, 0.05, "SingleLine" );
		ipAddEdt.SetTextColor( "#ffffffff" ); ipAddEdt.SetBackColor( "black" ); ipAddEdt.SetOnChange( ipAddEdt_OnChange );
    layConfig2.AddChild( ipAddEdt );

		otcHeightEdt = app.CreateTextEdit( app.LoadText("overTimeChartHeight", otcHeightDef, fCfg), 0.2, 0.05, "SingleLine" );
		otcHeightEdt.SetTextColor( "#ffffffff" ); otcHeightEdt.SetBackColor( "black" ); otcHeightEdt.SetOnChange( otcHeightEdt_OnChange );
    layConfig2.AddChild( otcHeightEdt );
	
		gWidthEdt = app.CreateTextEdit( app.LoadText("gWidth", gWidthDef, fCfg), 0.2, 0.05, "SingleLine" );
		gWidthEdt.SetTextColor( "#ffffffff" ); gWidthEdt.SetBackColor( "black" ); gWidthEdt.SetOnChange( gWidthEdt_OnChange );
    layConfig2.AddChild( gWidthEdt );

  	gHeightEdt = app.CreateTextEdit( app.LoadText("gHeight", gHeightDef, fCfg), 0.2, 0.05, "SingleLine" );
		gHeightEdt.SetTextColor( "#ffffffff" ); gHeightEdt.SetBackColor( "black" ); gHeightEdt.SetOnChange( gHeightEdt_OnChange );
    layConfig2.AddChild( gHeightEdt );

  	pfs1LimitEdt = app.CreateTextEdit( app.LoadText("pfs1Limit", pfs1LimitDef, fCfg), 0.2, 0.05, "SingleLine" );
		pfs1LimitEdt.SetTextColor( "#ffffffff" ); pfs1LimitEdt.SetBackColor( "black" ); pfs1LimitEdt.SetOnChange( pfs1LimitEdt_OnChange );
    layConfig2.AddChild( pfs1LimitEdt );

  	pfs2LimitEdt = app.CreateTextEdit( app.LoadText("pfs2Limit", pfs2LimitDef, fCfg), 0.2, 0.05, "SingleLine" );
		pfs2LimitEdt.SetTextColor( "#ffffffff" ); pfs2LimitEdt.SetBackColor( "black" ); pfs2LimitEdt.SetOnChange( pfs2LimitEdt_OnChange );
    layConfig2.AddChild( pfs2LimitEdt );

  	pfs3LimitEdt = app.CreateTextEdit( app.LoadText("pfs3Limit", pfs3LimitDef, fCfg), 0.2, 0.05, "SingleLine" );
		pfs3LimitEdt.SetTextColor( "#ffffffff" ); pfs3LimitEdt.SetBackColor( "black" ); pfs3LimitEdt.SetOnChange( pfs3LimitEdt_OnChange );
    layConfig2.AddChild( pfs3LimitEdt );

  	pfs4LimitEdt = app.CreateTextEdit( app.LoadText("pfs4Limit", pfs4LimitDef, fCfg), 0.2, 0.05, "SingleLine" );
		pfs4LimitEdt.SetTextColor( "#ffffffff" ); pfs4LimitEdt.SetBackColor( "black" ); pfs4LimitEdt.SetOnChange( pfs4LimitEdt_OnChange );
    layConfig2.AddChild( pfs4LimitEdt );

  	pfg1LimitEdt = app.CreateTextEdit( app.LoadText("pfg1Limit", pfg1LimitDef, fCfg), 0.2, 0.05, "SingleLine" );
		pfg1LimitEdt.SetTextColor( "#ffffffff" ); pfg1LimitEdt.SetBackColor( "black" ); pfg1LimitEdt.SetOnChange( pfg1LimitEdt_OnChange );
    layConfig2.AddChild( pfg1LimitEdt );

  	pfg2LimitEdt = app.CreateTextEdit( app.LoadText("pfg2Limit", pfg2LimitDef, fCfg), 0.2, 0.05, "SingleLine" );
		pfg2LimitEdt.SetTextColor( "#ffffffff" ); pfg2LimitEdt.SetBackColor( "black" ); pfg2LimitEdt.SetOnChange( pfg2LimitEdt_OnChange );
    layConfig2.AddChild( pfg2LimitEdt );

  	pfg3LimitEdt = app.CreateTextEdit( app.LoadText("pfg3Limit", pfg3LimitDef, fCfg), 0.2, 0.05, "SingleLine" );
		pfg3LimitEdt.SetTextColor( "#ffffffff" ); pfg3LimitEdt.SetBackColor( "black" ); pfg3LimitEdt.SetOnChange( pfg3LimitEdt_OnChange );
    layConfig2.AddChild( pfg3LimitEdt );

  	pfg4LimitEdt = app.CreateTextEdit( app.LoadText("pfg4Limit", pfg4LimitDef, fCfg), 0.2, 0.05, "SingleLine" );
		pfg4LimitEdt.SetTextColor( "#ffffffff" ); pfg4LimitEdt.SetBackColor( "black" ); pfg4LimitEdt.SetOnChange( pfg4LimitEdt_OnChange );
    layConfig2.AddChild( pfg4LimitEdt );
	
		bgndChk = app.CreateCheckBox( "Run in background" );
		bgndChk.SetChecked( app.LoadBoolean( "runInBackground", false, fCfg ) );
	  bgndChk.SetOnTouch( bgndChk_OnTouch );
    layConfig2.AddChild( bgndChk );
		
	
    //Add layouts to app.
    app.AddLayout( layMain )
	  app.AddLayout( layConfig )
    
    web.LoadHtml( html, "file:///Sys/" );
     
     
    //callbackFunction("fred");
    
    
    


	//Create a layout with objects vertically centered.
//	lay = app.CreateLayout( "Linear", "VCenter,FillXY" )

	//Create a text label and add it to layout.
//	txt = app.CreateText( "Hello" )
//	txt.SetTextSize( 32 )
//	lay.AddChild( txt )
	
	//Add layout to app.	
//	app.AddLayout( lay )
}

function ipAddEdt_OnChange()
{
	
    app.SaveText( "ipAddress", ipAddEdt.GetText(), fCfg );
}

function otcHeightEdt_OnChange() { otcHeightNew = otcHeightEdt.GetText(); app.SaveText( "overTimeChartHeight", otcHeightNew, fCfg ); }
function gWidthEdt_OnChange() { gWidthNew = gWidthEdt.GetText(); app.SaveText( "gWidth", gWidthNew, fCfg ); }
function gHeightEdt_OnChange() { gHeightNew = gHeightEdt.GetText(); app.SaveText( "gHeight", gHeightNew, fCfg ); }
function pfs1LimitEdt_OnChange() { pfs1LimitNew = pfs1LimitEdt.GetText(); app.SaveText( "pfs1Limit", pfs1LimitNew, fCfg ); }
function pfs2LimitEdt_OnChange() { pfs2LimitNew = pfs2LimitEdt.GetText(); app.SaveText( "pfs2Limit", pfs2LimitNew, fCfg ); }
function pfs3LimitEdt_OnChange() { pfs3LimitNew = pfs3LimitEdt.GetText(); app.SaveText( "pfs3Limit", pfs3LimitNew, fCfg ); }
function pfs4LimitEdt_OnChange() { pfs4LimitNew = pfs4LimitEdt.GetText(); app.SaveText( "pfs4Limit", pfs4LimitNew, fCfg ); }
function pfg1LimitEdt_OnChange() { pfg1LimitNew = pfg1LimitEdt.GetText(); app.SaveText( "pfg1Limit", pfg1LimitNew, fCfg ); }
function pfg2LimitEdt_OnChange() { pfg2LimitNew = pfg2LimitEdt.GetText(); app.SaveText( "pfg2Limit", pfg2LimitNew, fCfg ); }
function pfg3LimitEdt_OnChange() { pfg3LimitNew = pfg3LimitEdt.GetText(); app.SaveText( "pfg3Limit", pfg3LimitNew, fCfg ); }
function pfg4LimitEdt_OnChange() { pfg4LimitNew = pfg4LimitEdt.GetText(); app.SaveText( "pfg4Limit", pfg4LimitNew, fCfg ); }



function bgndChk_OnTouch()
{
		app.SaveBoolean("runInBackground", bgndChk.GetChecked(), fCfg );
}

function btnConfig_OnTouch()
{
	layConfig.Animate( "SlideFromRight" )
}

function btnBack_OnTouch()
{
	layConfig.Animate( "SlideToRight" )	
}

function btnRestore_OnTouch()
{
		ipAddEdt.SetText(ipAddDef);

		otcHeightNew = otcHeightDef;	otcHeightEdt.SetText(otcHeightNew); app.SaveText( "overTimeChartHeight", otcHeightNew, fCfg );
		gWidthNew = gWidthDef;	gWidthEdt.SetText(gWidthNew); app.SaveText( "gWidth", gWidthNew, fCfg );
		gHeightNew = gHeightDef;	gHeightEdt.SetText(gHeightNew); app.SaveText( "gHeight", gHeightNew, fCfg );
		pfs1LimitNew = pfs1LimitDef;	pfs1LimitEdt.SetText(pfs1LimitNew); app.SaveText( "pfs1Limit", pfs1LimitNew, fCfg );
		pfs2LimitNew = pfs2LimitDef;	pfs2LimitEdt.SetText(pfs2LimitNew); app.SaveText( "pfs2Limit", pfs2LimitNew, fCfg );
		pfs3LimitNew = pfs3LimitDef;	pfs3LimitEdt.SetText(pfs3LimitNew); app.SaveText( "pfs3Limit", pfs3LimitNew, fCfg );
		pfs4LimitNew = pfs4LimitDef;	pfs4LimitEdt.SetText(pfs4LimitNew); app.SaveText( "pfs4Limit", pfs4LimitNew, fCfg );
		pfg1LimitNew = pfg1LimitDef;	pfg1LimitEdt.SetText(pfg1LimitNew); app.SaveText( "pfg1Limit", pfg1LimitNew, fCfg );
		pfg2LimitNew = pfg2LimitDef;	pfg2LimitEdt.SetText(pfg2LimitNew); app.SaveText( "pfg2Limit", pfg2LimitNew, fCfg );
		pfg3LimitNew = pfg3LimitDef;	pfg3LimitEdt.SetText(pfg3LimitNew); app.SaveText( "pfg3Limit", pfg3LimitNew, fCfg );
		pfg4LimitNew = pfg4LimitDef;	pfg4LimitEdt.SetText(pfg4LimitNew); app.SaveText( "pfg4Limit", pfg4LimitNew, fCfg );
	
}

function Start()
{
//alert("here");
//web.Execute( "document.getElementById('inverterAddress').value;", callbackFunction );
     //web.Execute("scriptConfig.inverterAddress;", callbackFunction);
    
    chartTimer = setInterval(function() {
    
     if (runningInForeground || (!runningInForeground && bgndChk.GetChecked()))
    		app.HttpRequest( "GET", 'http://' + ipAddEdt.GetText() + '/solar_api/v1/GetPowerFlowRealtimeData.fcgi', null, null, handleReply );
    
    }, 1000);
    
}


function handleReply( error, reply )
{
//alert("here");
    if( error ) txtError.SetVisibility("Show");
    else
    {
    
    		txtError.SetVisibility("Hide");
    		var d = new Date();
        var newLabel = d.toLocaleTimeString();
        
        
        
        var result = JSON.parse(reply); 
        var p_load = Math.abs(result.Body.Data.Site.P_Load);
        var p_grid_from_grid = 0;
        var p_grid_to_grid = 0;
        
        if (result.Body.Data.Site.P_Grid < 0)
        	p_grid_to_grid = Math.abs(result.Body.Data.Site.P_Grid);
        else
        	p_grid_from_grid = Math.abs(result.Body.Data.Site.P_Grid);
        	
        var p_from_solar = p_load - p_grid_from_grid;
        
        //var cmd = 'addData(overTimeChart, "' + newLabel + '", ' + p_load + ', ' + p_from_solar + ', ' + p_grid_from_grid + ', ' + p_grid_to_grid + ');' 
        //alert(cmd);

        try
        {        
        web.Execute( 'addData(overTimeChart, "' + newLabel + '", ' + p_load + ', ' + p_from_solar + ', ' + p_grid_from_grid + ', ' + p_grid_to_grid + ');' )
        web.Execute('addGaugeData(fromGridGauge, ' + p_grid_from_grid + ');');
        web.Execute("document.getElementById('powerFromGrid').textContent = '" + Math.floor(p_grid_from_grid) + "W';");
        web.Execute('addGaugeData(fromSolarGauge, ' + (p_from_solar+p_grid_to_grid) + ');');
        web.Execute("document.getElementById('powerFromSolar').textContent = '" + Math.floor(p_from_solar+p_grid_to_grid) + "W';");
        } catch (err) {}

        if (otcHeightNew != "") { web.Execute("document.getElementById('overTimeDiv').style.height = '" + otcHeightNew + "';"); otcHeightNew = ""; }
        if (gWidthNew != "") { 
        		web.Execute("document.getElementById('fromSolarGauge').width = '" + gWidthNew + "';"); 
        		web.Execute("document.getElementById('fromGridGauge').width = '" + gWidthNew + "';"); gWidthNew = ""; }
        if (gHeightNew != "") { 
        		web.Execute("document.getElementById('fromSolarGauge').height = '" + gHeightNew + "';");  
        		web.Execute("document.getElementById('fromGridGauge').height = '" + gHeightNew + "';"); gHeightNew = ""; }
                        
        if (pfs1LimitNew != "") { web.Execute("fromSolarGauge.data.datasets[0].data[0] = " + pfs1LimitNew + "; fromSolarGauge.update();"); pfs1LimitNew = ""; }
        if (pfs2LimitNew != "") { web.Execute("fromSolarGauge.data.datasets[0].data[1] = " + pfs2LimitNew + "; fromSolarGauge.update();"); pfs2LimitNew = ""; }
        if (pfs3LimitNew != "") { web.Execute("fromSolarGauge.data.datasets[0].data[2] = " + pfs3LimitNew + "; fromSolarGauge.update();"); pfs3LimitNew = ""; }
        if (pfs4LimitNew != "") { web.Execute("fromSolarGauge.data.datasets[0].data[3] = " + pfs4LimitNew + "; fromSolarGauge.update();"); pfs4LimitNew = ""; }
        if (pfg1LimitNew != "") { web.Execute("fromGridGauge.data.datasets[0].data[0] = " + pfg1LimitNew + "; fromGridGauge.update();"); pfg1LimitNew = ""; }
        if (pfg2LimitNew != "") { web.Execute("fromGridGauge.data.datasets[0].data[1] = " + pfg2LimitNew + "; fromGridGauge.update();"); pfg2LimitNew = ""; }
        if (pfg3LimitNew != "") { web.Execute("fromGridGauge.data.datasets[0].data[2] = " + pfg3LimitNew + "; fromGridGauge.update();"); pfg3LimitNew = ""; }
        if (pfg4LimitNew != "") { web.Execute("fromGridGauge.data.datasets[0].data[3] = " + pfg4LimitNew + "; fromGridGauge.update();"); pfg4LimitNew = ""; }

                    
                                                
                                                                                                
    }
}


function OnPause()
{
    runningInForeground = false;
}

function OnResume()
{
    runningInForeground = true;
}



//function callbackFunction( value )
//{
 //   app.ShowPopup(value);
//}



let html = `
<!DOCTYPE html>
<html>
<head>
<style>
html, body {
    font-family: 'Arial', sans-serif;
    overscroll-behavior-y: none;
}
.canvas-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.gauge-title {
    display: inline-block; width: 200px; white-space: nowrap; font-weight: bold; color: dimgray; text-align: center; font-size: 22px;
}
.gauge-power {
    background-color: black; color: white; border-radius: 10px; padding: 5px;
}
.config-container {	display: flex; justify-content: flex-start; }
.config-left { }
.config-right { margin-left: auto; }
.size-field { width: 80px; }
.alert {
    padding: 20px;
    background-color: #f44336;
    color: white;
}
.alert.success {background-color: #04AA6D;}
.alert.info {background-color: #2196F3;}
.alert.warning {background-color: #ff9800;}
.form * {
    font-size: 20px;
}
</style>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
 <script src='file:///android_asset/app.js'></script>
</head>
<body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.1.0/chart.js"></script>


    <div id="overTimeDiv" style="height: ${app.LoadText('overTimeChartHeight', otcHeightDef, fCfg)}; width: 100%;"><canvas id="overTimeChart"></canvas></div>
    
	<div class="canvas-container">
        <div><span class="gauge-title">Power From Solar <span id="powerFromSolar" class="gauge-power"></span></span></div>
        <div><span class="gauge-title">Power From Grid <span id="powerFromGrid" class="gauge-power"></span></span></div>
	</div>
	<div class="canvas-container">
        <div><canvas id="fromSolarGauge" width="${app.LoadText('gWidth', gWidthDef, fCfg)}" height="${app.LoadText('gHeight', gHeightDef, fCfg)}"></canvas></div>
        <div><canvas id="fromGridGauge" width="${app.LoadText('gWidth', gWidthDef, fCfg)}" height="${app.LoadText('gHeight', gHeightDef, fCfg)}"></canvas></div>
	</div>


<script>
// Manage script configuration

//var scriptConfig = ${JSON.stringify(scriptConfig)};
//document.getElementById('inverterAddress').value = scriptConfig.inverterIpAddress;

</script>

<script src="https://unpkg.com/chartjs-gauge-v3/dist/index.js"></script>

<script>

// Manage the over time chart

const canvas = document.getElementById('overTimeChart');
const labels = [];
Chart.defaults.font.size = 20;

const data = {
    labels: labels,
    datasets: [{
        label: 'Consumed in full',
        fill: false,
        order: 1,
        backgroundColor: 'Orange', borderColor: 'Orange', pointRadius: 0, pointHoverRadius: 0
    },{
        label: 'Consumed from solar',
        fill: true,
        order: 2,
        backgroundColor: '#66cc00', borderColor: '#66cc00', pointRadius: 0, pointHoverRadius: 0,
        stack: 'Stack 1'
    },{
        label: 'Consumed from grid',
        fill: true,
        order: 3,
        backgroundColor: '#ff0000', borderColor: '#ff0000', pointRadius: 0, pointHoverRadius: 0,
        stack: 'Stack 1'
    },{
        label: 'Sent to grid',
        fill: true,
        order: 4,
        backgroundColor: 'Grey', borderColor: 'Grey', pointRadius: 0, pointHoverRadius: 0,
        stack: 'Stack 1'
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 0, easing: 'linear' },
        scales: {
            x: {
                ticks: { autoSkip: false, maxRotation: 15, minRotation: 15 },
                grid: { drawTicks: true, tickLength: 10, tickWidth: 2, tickColor: 'Black' },
                afterBuildTicks: function(scale) {
                    scale.ticks = scale.ticks.filter(function(value, index) {
                        return (index % 15 === 0);
                    });
                }                
            },
            y: {
                beginAtZero: true,
                position: 'right',
                title: { display: true, text: 'Watts' },
                gridLines: { drawOnChartArea: true },
                grid: { z: 1 },
                ticks: { stepSize: 100 }
            }
        },
        plugins: {
            title: { display: true, text: 'Power Over Time' }
        }
    }
};

const overTimeChart = new Chart(canvas, config);

function addData(chart, label, p_load_data, p_from_solar, p_grid_from_grid_data, p_grid_to_grid_data) {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(p_load_data);
    chart.data.datasets[1].data.push(p_from_solar);
    chart.data.datasets[2].data.push(p_grid_from_grid_data);
    chart.data.datasets[3].data.push(p_grid_to_grid_data);

    if (chart.data.labels.length > 120)
    {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
        chart.data.datasets[1].data.shift();
        chart.data.datasets[2].data.shift();
        chart.data.datasets[3].data.shift();
    }

    chart.update();
}

</script>

<script>

// Manage the gauges

var fromGridCanvas;
var fromGridGauge;
var fromSolarCanvas;
var fromSolarGauge;

function addGaugeData(chart, newdata) {
    chart.data.datasets[0].value = newdata;
    chart.update();
}    

//setTimeout(function() {

    var fromGridConfig = {
        type: 'gauge',
        data: {
            datasets: [
            		{ data: [${app.LoadText('pfg1Limit', pfg1LimitDef, fCfg)}, ${app.LoadText('pfg2Limit', pfg2LimitDef, fCfg)}, ${app.LoadText('pfg3Limit', pfg3LimitDef, fCfg)}, ${app.LoadText('pfg4Limit', pfg4LimitDef, fCfg)}], value: 1, backgroundColor: ["${scriptConfig.pfg1colour}", "${scriptConfig.pfg2colour}", "${scriptConfig.pfg3colour}", "${scriptConfig.pfg4colour}"], borderWidth: 2 }]
        },
        options: {
            responsive: false,
            layout: { padding: { top: 0, bottom: 0 } },
            valueLabel: { display: false }
        }
    };

    var fromSolarConfig = {
        type: 'gauge',
        data: {
            datasets: [
            		{ data: [${app.LoadText('pfs1Limit', pfs1LimitDef, fCfg)}, ${app.LoadText('pfs2Limit', pfs2LimitDef, fCfg)}, ${app.LoadText('pfs3Limit', pfs3LimitDef, fCfg)}, ${app.LoadText('pfs4Limit', pfs4LimitDef, fCfg)}], value: 1, backgroundColor: ["${scriptConfig.pfs1colour}", "${scriptConfig.pfs2colour}", "${scriptConfig.pfs3colour}", "${scriptConfig.pfs4colour}"], borderWidth: 2 }]
        },
        options: {
            responsive: false,
            layout: { padding: { top: 0, bottom: 0 } },
            valueLabel: { display: false }
        }
    };
  
    fromSolarCanvas = document.getElementById('fromSolarGauge').getContext('2d');
    fromSolarGauge = new Chart(fromSolarCanvas, fromSolarConfig);

    fromGridCanvas = document.getElementById('fromGridGauge').getContext('2d');
    fromGridGauge = new Chart(fromGridCanvas, fromGridConfig);
  
//}, 1000);

</script>


<script>
app.Execute( "Start();" );
</script>



</body>
</html>`;
