
 function _(el) {
        return document.getElementById(el);
    }

    function previewImage(file){
            var reader = new FileReader();
			reader.onload = function(e) {
                imagePreviewer.innerHTML = '<img src="' + e.target.result + '" /></p>';
			}
			reader.readAsDataURL(file);
    }

    function beforeSending(){
        progressBar.value = 0;
        ajaxStatus.innerHTML = "";
            if(!submitButton.hasAttribute("hidden"))
            {
                submitButton.setAttribute("hidden", true);
            }
            if(!imageInput.hasAttribute("hidden"))
            {
                imageInput.setAttribute("hidden", true);
            }
            if(abortSubmitButton.hasAttribute("hidden"))
            {
                abortSubmitButton.removeAttribute("hidden");
            }
    }

    function uploadFinished(isOk){
        uploadedSizeInfo.innerHTML = "";
        ajaxStatus.className = isOk?"success":"error";
        if(!abortSubmitButton.hasAttribute("hidden"))
        {
            abortSubmitButton.setAttribute("hidden", true);
        }
        if(!progressBar.hasAttribute("hidden"))
        {
            progressBar.setAttribute("hidden", true);
        }
        if(!isOk)
        {
            uploadedSizeInfo.innerHTML = "";
            if(submitButton.hasAttribute("hidden"))
            {
                submitButton.removeAttribute("hidden");
            }
            if(imageInput.hasAttribute("hidden"))
            {
                imageInput.removeAttribute("hidden");
            }
        }
    }

    function abortImage(){
        progressBar.value = 0;
        uploadedSizeInfo.innerHTML = "";
        uploadFinished(false);
        ajax.abort();
    }

    function sendImage()
    {
        if(imageInput.files.length > 0)
        {
            beforeSending();
            var file = imageInput.files[0];
            var formdata = new FormData();
            formdata.append("image", file);
            formdata.append("fbId", "254545454545");
            ajax.open("POST", uploadPhotoUrl); 
            ajax.send(formdata);
        }else{
            ajaxStatus.innerHTML = "Veuillez selectionner la photo"
        }
        
    }

    function loadFile(){
        if(imageInput.files.length > 0)
        {
            previewImage(imageInput.files[0]);
            if(submitButton.hasAttribute("hidden"))
            {
                submitButton.removeAttribute("hidden");
            }
        }else{
            if(!submitButton.hasAttribute("hidden"))
            {
                submitButton.createAttribute("hidden");
            }
        }
    }

    function progressHandler(event) {
        if(progressBar.hasAttribute("hidden"))
        {
            progressBar.removeAttribute("hidden");
        }

        uploadedSizeInfo.innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
        var percent = (event.loaded / event.total) * 100;
        progressBar.value = Math.round(percent);
        uploadedSizeInfo.innerHTML = Math.round(percent) + "% uploaded... please wait";
    }

    function completeHandler(event) {
        
        if(event.target.status == 200)
        {
            uploadFinished(true);
            progressBar.className="green";
            ajaxStatus.innerHTML = "Photo envoyée avec succès"
        }else{
            uploadFinished(false);
            progressBar.className="red";
            ajaxStatus.innerHTML = "Envoie du fichier échouée"
        }
    }

    function errorHandler(event) {
        ajaxStatus.innerHTML = "Erreur lors de l'envoie du fichier"
    }

    function abortHandler(event) {
        ajaxStatus.innerHTML = "Upload Annulé"
    }

    function init(){
        uploadPhotoUrl = "https://quickadev1.accesbanque.mg/uploadImage?name=test.png";
        progressBar = _("progressBar");
        submitButton = _("uploadImage");
        abortSubmitButton =  _("abortUpload");
        imagePreviewer =  _("imageDiv");
        imageInput =  _("file1");
        ajaxStatus = _("status");
        uploadedSizeInfo =  _("loaded_n_total");
        ajax = new XMLHttpRequest();
        ajax.upload.addEventListener("progress", progressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.addEventListener("abort", abortHandler, false);
    }

var fbId = null;
var psid = "<%= psid %>";
(function() {
    var submitButton = null;
    var progressBar = null;
    var abortSubmitButton = null;
    var imagePreviewer = null;
    var imageInput = null;
    var uploadedSizeInfo = null;
    var ajaxStatus = null;
    var ajax = null;
    var uploadPhotoUrl = null;
    init();
})();