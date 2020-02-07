<%@ Page Title="" Language="C#" MasterPageFile="~/DMS.Master" AutoEventWireup="true"
    CodeBehind="Dashboard.aspx.cs" Inherits="HRPayroll.Home.Dashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../JavaScript/Dashboard.js" type="text/javascript"></script>
  <%--  <link href="../assets/css/dashboard.css" rel="stylesheet" type="text/css" />--%>
    <%--<link href="../css/all.min.css" rel="stylesheet" type="text/css" />--%>
    <script src="../js/jquery-1.11.3.min.js" type="text/javascript"></script>
   
    <script>        var jquery_1_11_3_min_p = jQuery.noConflict();</script>
      <script src="../js/jquery-2.2.3.min.js" type="text/javascript"></script>
    <script  type="text/javascript">        var jquery_2_2_3_min = jQuery.noConflict();</script>
    <script src="../js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../js/jquery-ui.min.js" type="text/javascript"></script>
 
    <%--<script src="../js/serial.js" type="text/javascript"></script>--%>
    <link href="../Telerix/Style/kendo.default.mobile.min.css" rel="stylesheet" type="text/css" />
    <link href="../Telerix/Style/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Telerix/Style/kendo.rtl.min.css" rel="stylesheet" type="text/css" />
    <link href="../Telerix/Style/kendo.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../Telerix/Style/kendo.dataviz.min.css" rel="stylesheet" type="text/css" />
    <link href="../Telerix/Style/kendo.dataviz.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../Telerix/js/angular.min.js"  type="text/javascript"></script>
    <script src="../Telerix/js/kendo.all.min.js"  type="text/javascript"></script>
    <script  type="text/javascript">        var kendo_all_min_js = jQuery.noConflict();</script>
    <script src="../Telerix/js/jquery.min.js"  type="text/javascript"></script>
    <script src="../Telerix/js/jszip.min.js" type="text/javascript"></script>
    <script src="../js/jquery-ui.custom.min.js" type="text/javascript"></script>
    <script src="../js/jquery.ui.touch-punch.min.js" type="text/javascript"></script>
    <%--<script type="text/javascript" src="../js/canvasjs.min.js"></script>--%>
    <%--  <script src="../js/highcharts.js" type="text/javascript"></script>
  <script type="text/javascript">      var jquery_highcharts = jQuery.noConflict();</script>
        <script src="../js/highcharts-3d.js" type="text/javascript"></script>
--%>

      <%--<script language = "JavaScript">
       jquery_highcharts(document).ready(function () {
           var title = {
               text: ''
           };
           var subtitle = {
               text: ''
           };
           var xAxis = {
               categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
           };
           var yAxis = {
               title: {
                   text: 'No. of Mandates'
               },
               plotLines: [{
                   value: 0,
                   width: 1,
                   color: '#808080'
               }]
           };
           var tooltip = {
               headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
               pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b> {point.y}</b></td></tr>',
               footerFormat: '</table>',
               shared: true,
               useHTML: true
           }
           var legend = {
               layout: 'vertical',
               align: 'right',
               verticalAlign: 'middle',
               borderWidth: 0
           };
           var series = [{
               name: 'Reason 1',
               data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,
                     26.5, 23.3, 18.3, 13.9, 9.6]
           },
                 {
                     name: 'Reason 2',
                     data: [6.0, 6.9, 7.5, 9.5, 10.2, 11.5, 12.2,
                     18.5, 19.3, 22.3, 23.9, 25.6]
                 },
                 {
                     name: 'Reason 3',
                     data: [5.0, 5.9, 6.5, 10.5, 11.2, 14.5, 15.2,
                     18.5, 21.3, 24.3, 27.9, 29.6]
                 },
                 {
                     name: 'Reason 4',
                     data: [7.0, 7.9, 8.5, 11.5, 15.2, 18.5, 19.2,
                     22.5, 25.3, 28.3, 29.9, 27.6]
                 }

            ];

           var json = {};
           json.title = title;
           json.subtitle = subtitle;
           json.xAxis = xAxis;
           json.yAxis = yAxis;
           json.tooltip = tooltip;
           json.legend = legend;
           json.series = series;

           jquery_highcharts('#trend').highcharts(json);
       });
      </script>
      <script language = "JavaScript">
          jquery_highcharts(document).ready(function () {
              Highcharts.chart('presentmentGraph', {
                  chart: {
                      type: 'column'
                  },
                  title: {
                      text: 'Presentment Wise (2019)'
                  },
                  subtitle: {
                      text: ''
                  },
                  xAxis: {
                      categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
                      crosshair: true
                  },
                  yAxis: {
                      min: 0,
                      title: {
                          text: 'No. of Mandates'
                      }
                  },
                  tooltip: {
                      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b> {point.y}</b></td></tr>',
                      footerFormat: '</table>',
                      shared: true,
                      useHTML: true
                  },
                  plotOptions: {
                      column: {
                          pointPadding: 0.1,
                          borderWidth: 0
                      }
                  },
                  series: [{
                      name: 'Total Presentment',
                      data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 70, 40]

                  }, {
                      name: 'Rejected Presentment',
                      data: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 75]

                  }]
              });
          });
      </script>
      <script language = "JavaScript">
           jquery_highcharts(document).ready(function () {
               Highcharts.chart('collectionGraph', {
                   chart: {
                       type: 'column'
                   },
                   title: {
                       text: 'Amount Wise (2019)'
                   },
                   subtitle: {
                       text: ''
                   },
                   xAxis: {
                       categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
                       crosshair: true
                   },
                   yAxis: {
                       min: 0,
                       title: {
                           text: 'No. of Mandates'
                       }
                   },
                   tooltip: {
                       headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                       pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>Rs. {point.y}</b></td></tr>',
                       footerFormat: '</table>',
                       shared: true,
                       useHTML: true
                   },
                   plotOptions: {
                       column: {
                           pointPadding: 0.1,
                           borderWidth: 0
                       }
                   },
                   series: [{
                       name: 'Presented Amount',
                       data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 70, 40]

                   }, {
                       name: 'Collected Amount',
                       data: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 45, 15]

                   }]
               });
           });
      </script>
      <script language = "JavaScript">
         jquery_highcharts(document).ready(function () {
             Highcharts.chart('comparisonGraph', {
                 chart: {
                     type: 'column'
                 },
                 title: {
                     text: 'Year To Year Comparison'
                 },
                 subtitle: {
                     text: ''
                 },
                 xAxis: {
                     categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
                     crosshair: true
                 },
                 yAxis: {
                     min: 0,
                     title: {
                         text: 'No. of Mandates'
                     }
                 },
                 tooltip: {
                     headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                     pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b> {point.y}</b></td></tr>',
                     footerFormat: '</table>',
                     shared: true,
                     useHTML: true
                 },
                 plotOptions: {
                     column: {
                         pointPadding: 0.1,
                         borderWidth: 0
                     }
                 },
                 series: [{
                     name: '2018',
                     data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 70, 40]

                 }, {
                     name: '2017',
                     data: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 45, 15]

                 }]
             });
         });
      </script>--%>

     <%-- <style>
 .page-content{ overflow-y: scroll;
    max-height: 534px; overflow-x: hidden;}
  #chartdiv {
    width: 100%;
    height: 250px;
}
#sidebar-collapse{ display:block}
text {
    font-size: 10px;
}
.k-block, .k-header, .k-grid-header, .k-toolbar, .k-grouping-header, .k-pager-wrap, .k-button, .k-draghandle, .k-treemap-tile, html .km-pane-wrapper .k-header {
    background-color: #748292 !important;
}
.k-header, .k-grid-header, .k-toolbar, .k-dropdown-wrap, .k-picker-wrap, .k-numeric-wrap, .k-grouping-header, .k-pager-wrap, .k-textbox, .k-button, .k-progressbar, .k-draghandle, .k-autocomplete, .k-state-highlight, .k-tabstrip-items .k-item, .k-panelbar .k-tabstrip-items .k-item, .km-pane-wrapper>.km-pane>.km-view>.km-content{background-image: none !important;}
.k-block, .k-widget, .k-input, .k-textbox, .k-group, .k-content, .k-header, .k-filter-row>th, .k-editable-area, .k-separator, .k-colorpicker .k-i-arrow-s, .k-textbox>input, .k-autocomplete, .k-dropdown-wrap, .k-toolbar, .k-group-footer td, .k-grid-footer, .k-footer-template td, .k-state-default, .k-state-default .k-select, .k-state-disabled, .k-grid-header, .k-grid-header-wrap, .k-grid-header-locked, .k-grid-footer-locked, .k-grid-content-locked, .k-grid td, .k-grid td.k-state-selected, .k-grid-footer-wrap, .k-pager-wrap, .k-pager-wrap .k-link, .k-pager-refresh, .k-grouping-header, .k-grouping-header .k-group-indicator, .k-panelbar>.k-item>.k-link, .k-panel>.k-item>.k-link, .k-panelbar .k-panel, .k-panelbar .k-content, .k-treemap-tile, .k-calendar th, .k-slider-track, .k-splitbar, .k-dropzone-active, .k-tiles, .k-toolbar, .k-tooltip, .k-button-group .k-tool, .k-upload-files {
    border-color: #c4c7ca !important;
}

.chart {
  width: 100%; 
  min-height: 250px;
}
label {
    margin: 0 !important;
    font-size: 11px;
}
   </style>--%>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<%-- <div class="main-content" style="background-color: #ecf0f5;">
 <div class="col-md-12 col-sm-12 col-xs-12 " style="margin-top: 5px">
                <div class="col-sm-6 col-md-6 col-xs-6 no-padding">
                    <span class="legal">Dashboard</span>
                </div>
                
            </div>
        <div class="main-content-inner">
         
            <div class="page-content">
            <div class="row">
                <div class="col-sm-6 col-md-6">
                <div class="panel-group">
                        <div class="panel panel-default">
                          <div class="panel-heading registeredMandates" >
                            <h4 class="panel-title">
                              <a data-toggle="collapse" href="#collapse0"><i class="fa fa-line-chart" aria-hidden="true"></i> Registered Mandates: Last 7 Days</a>
                            
                            </h4>
                            <div class="filter">
                                 
                <label> Date:</label>
                <input type="date" class="filterDropdown aa" />
                
                                     </div>
                          </div>
                          <div id="collapse0" class="panel-collapse collapse show">
                            <div class="panel-body">
                              
                                <table class="table table-fixed">
                                <thead>
                                  <tr>
                                    <th>Date</th>
                                    <th>No. of Mandates</th>
                                    <th>Trend</th>
                                   
                                  </tr>
                                  </thead>
                                  <tbody>
                                      <tr>
                                        <td>01/08/2019</td>
                                        <td>5</td>
                                        <td><i class="fa fa-arrow-up activeBull" aria-hidden="true"></i></td>
                                      </tr>
                                      <tr>
                                        <td>02/08/2019</td>
                                        <td>12</td>
                                        <td><i class="fa fa-arrow-up activeBull" aria-hidden="true"></i></td>
                                      </tr>
                                      <tr>
                                        <td>03/08/2019</td>
                                        <td>15</td>
                                        <td><i class="fa fa-arrow-down inactiveBull" aria-hidden="true"></i></td>
                                      </tr>
                                      <tr>
                                        <td>04/08/2019</td>
                                        <td>18</td>
                                        <td><i class="fa fa-arrow-down inactiveBull" aria-hidden="true"></i></td>
                                      </tr>
                                      <tr>
                                        <td>05/08/2019</td>
                                        <td>21</td>
                                        <td><i class="fa fa-arrow-up activeBull" aria-hidden="true"></i></td>
                                      </tr>
                                    <tr>
                                        <td>06/08/2019</td>
                                        <td>25</td>
                                        <td><i class="fa fa-arrow-up activeBull" aria-hidden="true"></i></td>
                                      </tr>
                                      <tr>
                                        <td>07/08/2019</td>
                                        <td>28</td>
                                        <td><i class="fa fa-arrow-up activeBull" aria-hidden="true"></i></td>
                                      </tr>
                                      </tbody>
                    </table>

                            </div>
                           
                          </div>
                        </div>
                      </div>
                   <div class="panel-group">
                        <div class="panel panel-default">
                          <div class="panel-heading">
                            <h4 class="panel-title">
                              <a data-toggle="collapse" href="#collapse1"><i class="fa fa-line-chart" aria-hidden="true"></i> Rejection Trend</a>
                           
                            </h4>
                          </div>
                          <div id="collapse1" class="panel-collapse collapse show">
                            <div class="panel-body" style="position:relative">
                            <label class="selectedYear">2019</label>
                            <div id = "trend" style = "width: 100%; height: 250px; margin: 0 auto"></div>
                               
                            </div>
                           
                          </div>
                        </div>
                      </div>
                     

                  

                      <div class="panel-group">
                        <div class="panel panel-default">
                          <div class="panel-heading">
                            <h4 class="panel-title">
                              <a data-toggle="collapse" href="#collection"><i class="fa fa-line-chart" aria-hidden="true"></i> Mode Wise Registered Mandates: Last Month</a>
                              </h4>
                              <div class="filter">
                                 
                <label class="filterLabel"> Select Month:</label>
                <select class="filterDropdown">
                  <option value="select">Select</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                
                                     </div>
                          </div>
                          <div id="collection" class="panel-collapse collapse show">
                            <div class="panel-body">
                               <div class="col-md-6">
                       
                        <div class="info-box bg-yellow">
                            <span class="info-box-icon"><i class="fa fa-user" aria-hidden="true" style="padding-top: 10px;"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-text">Physical</span> <span class="info-box-number">1,050</span>
                                <div class="progress">
                                    <div class="progress-bar" style="width: 50%">
                                    </div>
                                </div>
                             
                            </div>
                         
                        </div>
                     
                    </div>
                    <div class="col-md-6">
                        <div class="info-box bg-aqua">
                            <span class="info-box-icon"><i class="fa fa-credit-card" aria-hidden="true" style="padding-top: 10px;"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-text">Debit Card</span> <span class="info-box-number">800</span>
                                <div class="progress">
                                    <div class="progress-bar" style="width: 20%">
                                    </div>
                                </div>
                           
                            </div>
                        
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="info-box bg-red">
                            <span class="info-box-icon"><img src="../images/netbanking_icon.png" style="padding-top: 10px;"/></span>
                            <div class="info-box-content">
                                
                                <span class="info-box-text">Net Banking</span> <span class="info-box-number">900</span>
                                <div class="progress">
                                    <div class="progress-bar" style="width: 20%">
                                    </div>
                                </div>
                             
                            </div>
                         
                        </div>
                    </div>
                            </div>
                           
                          </div>
                        </div>
                      </div>

                      
 </div>
                <div class="col-sm-6 col-md-6">

                <div class="panel-group">
                        <div class="panel panel-default">
                          <div class="panel-heading rejectededMandates" >
                            <h4 class="panel-title">
                              <a data-toggle="collapse" href="#bankWise"><i class="fa fa-line-chart" aria-hidden="true"></i> Bank Wise Rejection: Last Month</a>
                              <label class="qty">Quantity: 100</label>
                            </h4>
                            <div class="filter">
                                 
                <label class="filterLabel"> Select Bank:</label>
                <select class="filterDropdown" id="selectBank">
                  <option value="select">Select</option>
                  <option value="1">HDFC Bank</option>
                  <option value="2">PNB Bank</option>
                  <option value="3">ICICI Bank</option>
                  <option value="4">SBI Bank</option>
                 
                </select>
                
                                     </div>
                          </div>
                          <div id="bankWise" class="panel-collapse collapse show">
                            <div class="panel-body">
                            
                                <table class="table table-fixed" id="rejectedMandateDetails">
                                <thead>
                                  <tr>
                                    <th width="120px">Bank Name</th>
                                    <th width="490px">No. of Rejected Mandates</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                      <tr>
                                        <td width="120px">HDFC</td>
                                        <td width="490px">5</td>
                                       </tr>
                                      <tr>
                                        <td width="120px">PNB</td>
                                        <td width="490px">12</td> 
                                      </tr>
                                      <tr>
                                        <td width="120px">SBI</td>
                                        <td width="490px">15</td>
                                        </tr>
                                      <tr>
                                        <td width="120px">ICICI</td>
                                        <td width="490px">18</td>
                                        </tr>
                                    
                                      </tbody>
                    </table>

                                <table class="table table-fixed" id="bankWiseDetails">
                                <thead>
                                  <tr>
                                    <th width="120px">No. of Rejected Mandates</th>
                                    <th width="490px">Reason</th>
                                   
                                  </tr>
                                  </thead>
                                  <tbody>
                                      <tr>
                                        <td width="120px">5</td>
                                        <td width="490px">Reason 1</td>
                                      </tr>
                                      <tr>
                                        <td width="120px">12</td>
                                        <td width="490px">Reason 2</td>
                                      </tr>
                                      <tr>
                                        <td width="120px">15</td>
                                        <td width="490px">Reason 3</td>
                                      </tr>
                                      <tr>
                                        <td width="120px">18</td>
                                        <td width="490px">Reason 4</td>
                                      </tr>
                                    <tr>
                                        <td width="120px">20</td>
                                        <td width="490px">Reason 5</td>
                                      </tr>
                                      <tr>
                                        <td width="120px">21</td>
                                        <td width="490px">Reason 6</td>
                                      </tr>
                                      </tbody>
                    </table>

                            </div>
                           
                          </div>
                        </div>
                      </div>

<div class="panel-group">
                        <div class="panel panel-default">
                          <div class="panel-heading rejectededMandates" >
                            <h4 class="panel-title">
                              <a data-toggle="collapse" href="#statusInfo"><i class="fa fa-line-chart" aria-hidden="true"></i> Mandate Status: Last Week</a>
                            
                            </h4>
                            
                          </div>
                          <div id="statusInfo" class="panel-collapse collapse show">
                            <div class="panel-body">

                                <table class="table table-fixed" id="mandateStatus">
                                <thead>
                                  <tr>
                                    <th width="350px">Mandate Status</th>
                                    <th width="350px">Total Mandates</th>
                                   
                                  </tr>
                                  </thead>
                                  <tbody>
                                      <tr style=" background: #c3dbde">
                                        <td width="350px">Saved Mandates</td>
                                        <td width="350px">25</td>                                       
                                      </tr>
                                      <tr style=" background: #f9d3d3">
                                        <td width="350px">Bank Validated Mandates</td>
                                        <td width="350px">20</td>
                                      </tr>
                                      <tr style=" background: #d2c8d0">
                                        <td width="350px">Account Validated Mandates</td>
                                        <td width="350px">15</td>
                                      </tr>
                                    
                                      </tbody>
                    </table>

                            </div>
                           
                          </div>
                        </div>
                      </div>


               <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                              <a data-toggle="collapse" href="#collapse5"><i class="fa fa-line-chart" aria-hidden="true"></i> Presentment Vs Collection</a>
                            </h4>
          <div class="selectOption">
         
            <div class="checkbox">
              <label><input type="checkbox" value="" class="amountGraph">Amount Wise</label>
            </div>
          </div>
                            <div class="filter">
                                 
                <label class="filterLabel"> Compare:</label>
                <select class="filterDropdown" id="compareYearly">
                  <option value="select">Select</option>
                  <option value="1">2019</option>
                  <option value="2">2018</option>
                  <option value="3">2017</option>
                  <option value="1">2016</option>
                  <option value="2">2015</option>
                  <option value="3">2014</option>
                </select>
                
                                     </div>
                </div>
                <div id="collapse5">
               
             
                 <div class="col-md-12 col-sm-12 col-xs-12 piechart no-padding">
                    
                       <div id = "presentmentGraph" style = "width: 100%; height: 300px; margin: 0 auto"></div>
                    
                    </div>
              
               
                </div>
            </div>
                
               
                     

                        
                      </div>
            </div>
               
            
               
            </div>
        </div>
    </div>--%>
</asp:Content>
