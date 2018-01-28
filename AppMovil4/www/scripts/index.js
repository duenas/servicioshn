// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en cordova-simulate o en dispositivos o emuladores Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova se ha cargado. Haga aquí las inicializaciones que necesiten Cordova.
        //document.getElementById("btnBuscar").addEventListener('click', BuscarUsuario, false);
        //document.getElementById("btnGuardar").addEventListener('click', RegistrarUsuario, false);
        //document.getElementById("pdf").addEventListener('click', openPDF, false);

        document.getElementById('help-select').addEventListener('change', ejecuta, false);
     





    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };

    //FUNCIONES PERSONALIZADAS
    function BuscarUsuario() {
        var pFullname = document.getElementById("txtNombre").value;
        if (pFullname == "") {
            $("#divResultado").html("Ingrese el nombre de usuario!");
        } else {
            var cadena = "<table data-role='table' class='ui-responsive' width='100%'>";
            cadena = cadena + "<thead><tr><th>Usuario</th><th>Nombre</th><th>Fecha Nac.</th></tr></thead><tbody>";

            //agregando evento Ajax
            $.ajax({
                type: "POST",
                url: "http://servicioshn.somee.com/postdata.aspx/BuscarUsuario",
                data: "{'pFullname':'" + pFullname + "'}",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                cache: false,
                success: function (result) {
                    if (result.d != null) {
                        if (result.d.length > 0) {
                            $(result.d).each(function () {
                                var cUsername = this.cUsername;
                                var cFullname = this.cFullname;
                                var dFechaNac = this.dFechaNac;

                                cadena = cadena + "<tr><td>" + cUsername + "</td>";
                                cadena = cadena + "<td>" + cFullname + "</td>";
                                cadena = cadena + "<td>" + dFechaNac + "</td></tr>";
                            });
                            cadena = cadena + "</tbody></table>";
                            $("#divResultado").html(cadena);
                        }
                        else {
                            $("#divResultado").html("No se encontraron resultados!");
                        }
                    }
                },
                error: function (result) {
                    alert("Ocurrió un problema. Por favor Comuníquese con el administrador del sistema. Gracias.");
                }
            });
        }
    }

    function RegistrarUsuario() {
        var pUsername = document.getElementById("txtUsername").value;
        var pPassword = document.getElementById("txtPassword").value;
        var pFullname = document.getElementById("txtFullname").value;
        var pCelular = document.getElementById("txtCelular").value;
        var pEmail = document.getElementById("txtEmail").value;
        var pFechaNac = document.getElementById("txtFechaNac").value;

        if (pUsername == "") {
            alert("Ingrese un usuario!");
            return false;
        }
        if (pPassword == "") {
            alert("Ingrese un password!");
            return false;
        }
        if (pFullname == "") {
            alert("Ingrese el nombre completo!");
            return false;
        }
        if (pEmail == "") {
            alert("Ingrese el email!");
            return false;
        }

        var insert = 0;
        if (confirm("Estas seguro?")) {
            //agregando evento Ajax
            $.ajax({
                type: "POST",
                url: "http://servicioshn.somee.com/postdata.aspx/RegistraUsuario",
                data: "{'pUsername':'" + pUsername + "','pPassword':'" + pPassword + "','pFullname':'" + pFullname + "','pCelular':'" + pCelular + "','pEmail':'" + pEmail + "','pFechaNac':'" + pFechaNac + "'}",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                cache: false,
                success: function (result) {
                    if (result.d != null) {
                        insert = result.d;
                    }

                    if (insert == 1) {
                        document.getElementById("txtUsername").value = "";
                        document.getElementById("txtPassword").value = "";
                        document.getElementById("txtFullname").value = "";
                        document.getElementById("txtCelular").value = "";
                        document.getElementById("txtEmail").value = "";
                        document.getElementById("txtFechaNac").value = "";
                        $("#divRegistro").html("Registro creado satisfactoriamente!");
                    } else {
                        $("#divRegistro").html("Error al registrar el usuario!");
                    }
                },
                error: function (result) {
                    alert("Ocurrió un problema. al insertar");
                }
            });
        }
    }

    function showHelp(url) {

        var target = "_blank";

        var options = "location=yes,hidden=yes";

        inAppBrowserRef = cordova.InAppBrowser.open(url, target, options);

        inAppBrowserRef.addEventListener('loadstart', loadStartCallBack);

        inAppBrowserRef.addEventListener('loadstop', loadStopCallBack);

        inAppBrowserRef.addEventListener('loaderror', loadErrorCallBack);

    }
    function loadStartCallBack() {

        $('#status-message').text("loading please wait ...");

    }


    function loadStopCallBack() {

        if (inAppBrowserRef != undefined) {

            inAppBrowserRef.insertCSS({ code: "body{font-size: 25px;" });

            $('#status-message').text("");

            inAppBrowserRef.show();
        }

    }

    function loadErrorCallBack(params) {

        $('#status-message').text("");

        var scriptErrorMesssage =
            "alert('Sorry we cannot open that page. Message from the server is : "
            + params.message + "');"

        inAppBrowserRef.executeScript({ code: scriptErrorMesssage }, executeScriptCallBack);

        inAppBrowserRef.close();

        inAppBrowserRef = undefined;

    }

    function executeScriptCallBack(params) {

        if (params[0] == null) {

            $('#status-message').text(
                "Sorry we couldn't open that page. Message from the server is : '"
                + params.message + "'");
        }

    }

   /* $('#help-select').on('change', function (e)*/ 
        function ejecuta() {
        var url;
        var valor = document.getElementById("help-select").value;
        switch (valor) {

            case "article":
                url = "http://192.168.0.11:9999/ejemplo.pdf";
                   
                break;

            case "video":
                url = "https://youtu.be/F-GlVrTaeH0";
                break;

            case "search":
                url = "https://www.google.com/#q=inAppBrowser+plugin";
                break;
        }

        showHelp(url);

    }






} )();