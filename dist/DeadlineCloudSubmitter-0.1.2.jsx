// THIS FILE HAS BEEN AUTO-GENERATED.
// Manual changes in this file may be overwritten by a new installation.
// Please change the source files and regenerate this file instead.

function __generateUtil() {

    var scriptFileUtilName = "Util.jsx";

    function deadlineStringToArray(str) {
        /**
         * Turn given string into array.
         * @param {string} str - String to turn into an array
         * Return converted string as an array.
         */
        str = str.replace("\r", "");
        var tempArray = str.split('\n');
        var array;

        if (tempArray.length > 0) {
            array = new Array(tempArray.length - 1);

            // Only loop to second last item in tempArray, because the last item is always empty.
            for (var i = 0; i < tempArray.length - 1; i++)
                array[i] = tempArray[i].replace("\n", "").replace("\r", "");
        } else
            array = new Array(0);

        return array;
    }

    function toBooleanString(value) {
        /**
         * Check if given value is true or false.
         * Return result
         * @param {string} value - "true" or "false" given as a string.
         */
        if (value)
            return "true";
        else
            return "false";
    }

    function parseBool(value) {
        /**
        * Changes string given value into a boolean and return it.
        * @param {string} value - Given value to transform in boolean type.
        * Returns boolean transformed value
        */
        value = value.toLowerCase();
        if (value == "1" || value == "t" || value == "true")
            return true;

        return false;
    }

    function trim(stringToTrim) {
        /**
        * Changes certain characters to empty string("")
        * @param {stringToTrim} stringToTrim - Given string to replace illegal characters with "".
        * Returns trimmed string
        */
        return stringToTrim.replace(/^\s+|\s+$/g, "");
    }

    function trimIllegalChars(stringToTrim) {
        /**
        * Trims certain characters out of a given string
        * @param {string} stringToTrim - Given string to trim illegal characters from.
        * Returns trimmed string
        */
        // \ / : * ? " < > |
        return stringToTrim.replace(/([\*\?\|:\"<>\/\\%£])/g, "");
    }

    function sliderTextSync(sliderObj, textObj, minValue, maxValue) {
        /**
        * Create a link between slider value and text value. If you change one the other changes with the same value.
        * @param {slider} sliderObj - Slider object
        * @param {edittext} textObj - Text object
        * @param {int} minValue - Minimum value that the slider/edittext can have.
        * @param {int} maxValue - Maximum value that the slider/edittext can have
        */
        textObj.onChange = function() {
            var newValue = parseFloat(textObj.text);
            if (!isNaN(newValue) && newValue >= minValue && newValue <= maxValue) {
                sliderObj.value = newValue;
                logger.log("Changed editText(" + textObj.name + ") value to: " + newValue, scriptFileUtilName, LOG_LEVEL.DEBUG);
            }
        }
        //this.text = Math.round( sliderObj.value ); 


        sliderObj.onChange = function() {
            textObj.text = Math.round(this.value);
            logger.log("Changed sliderObject(" + sliderObj.name + ") value to: " + Math.round(this.value), scriptFileUtilName, LOG_LEVEL.DEBUG);
        }
    }

    function changeTextValue(sliderObj, textObj, minValue, maxValue) {
        /**
        * Create a link between slider value and text value. If you change one the other changes with the same value.
        * @param {slider} sliderObj - Slider object
        * @param {edittext} textObj - Text object
        * @param {int} minValue - Minimum value that the slider/edittext can have.
        * @param {int} maxValue - Maximum value that the slider/edittext can have
        */
        var sliderValue = Math.round(sliderObj.value);
        if (!isNaN(sliderValue) && sliderValue >= minValue && sliderValue <= maxValue) {
            textObj.text = sliderValue;
        }

    }

    function changeSliderValue(sliderObj, textObj, minValue, maxValue) {
        /**
        * Create a link between slider value and text value. If you change one the other changes with the same value.
        * @param {slider} sliderObj - Slider object
        * @param {edittext} textObj - Text object
        * @param {int} minValue - Minimum value that the slider/edittext can have.
        * @param {int} maxValue - Maximum value that the slider/edittext can have
        */

        var newValue = parseFloat(textObj.text);
        if (newValue < minValue) {
            textObj.text = minValue;
            sliderObj.value = minValue;
        } else if (newValue > maxValue) {
            textObj.text = maxValue;
            sliderObj.value = maxValue;
        }
        if (!isNaN(newValue) && newValue >= minValue && newValue <= maxValue) {
            sliderObj.value = newValue;
        }
    }

    function spinBoxLimiterMin(minValue, maxValue) {
        /**
        * Limits spinbox minimum value.
        * @param {int} minValue - Minimum value allowed for the spinbox.
        * @param {int} maxValue - Maximum value allowed for the spinbox.
        */
        minValue.text = minValue.text.replace(/[^\d]/g, '');

        if (parseInt(minValue.text) > parseInt(maxValue.text)) {
            minValue.text = maxValue.text;
        }
    }

    function spinBoxLimiterMax(minValue, maxValue) {
        /**
        * Limits spinbox maximum value.
        * @param {int} minValue - Minimum value allowed for the spinbox.
        * @param {int} maxValue - Maximum value allowed for the spinbox.
        */
        maxValue.text = maxValue.text.replace(/[^\d]/g, '');
        if (parseInt(maxValue.text) < parseInt(minValue.text)) {
            maxValue.text = minValue.text
        }
    }

    function editTextIntValidation(editTextObject, sliderObject) {
        /**
        * Validates edit text widget data to be able to use in slider object.
        * @param {Object} editTextObject - Target object to set data for.
        * @param {Object} sliderObject - Source object to retrieve data from.
        */
        editTextObject.text = editTextObject.text.replace(/[^\d]/g, '');
        if (editTextObject.text == "") {
            editTextObject.text = Math.round(sliderObject.value);
        }
    }

    function getAssetsInScene(listBox) {
        /**
        * Gets available assets in the scene that have been previously added to a listbox,
        * and adds the; into a list
        * @param {Object} listBox - Source object to retrieve data from.
        * Returns array with assets available in the scene.
        */
        var _assetsList = []
        for (var i = 0; i < listBox.items.length; i++) {
            _assetsList.push(listBox.items[i].text);
        }
        return _assetsList;
    }

    function validateSkipExistingFrames(renderQueueItem, renderSettings, renderValidation) {
        /**
        * For given renderQueueItem checks if option 'Skip Existing Frame' has been enabled or not.
        * If disabled, force enable.
        * @param {Object} renderQueueItem - Target renderQueueItem.
        * @param {Object} renderSettings - Target renderQueueItem Settings.
        * @param {boolean} renderValidation
        * Returns boolean to proceed or halt the submission process.
        */
        if (renderSettings["Skip Existing Files"] == "false") {
            var skipWindow = new Window("dialog", "Skip Existing Files Setting");
            var skipText = skipWindow.add("statictext", undefined, "Skip Existing Files has not been enabled in the Render Settings for the RenderQueueItem. Please enable to continue.");
            skipWindow.skipButtonsGroup = skipWindow.add("group", undefined);
            skipWindow.skipButtonsGroup.orientation = "row";

            var buttonContinue = skipWindow.skipButtonsGroup.add("button", undefined, "Continue");
            buttonContinue.size = [60, 20];
            var buttonCancel = skipWindow.skipButtonsGroup.add("button", undefined, "Cancel");
            buttonCancel.size = [60, 20];

            buttonCancel.onClick = function() {
                renderValidation = false;
                skipWindow.close();
            }

            buttonContinue.onClick = function() {
                // Update Skip Existing Files to true.
                var newSettings = {
                    "Skip Existing Files": true
                };
                renderQueueItem.setSettings(newSettings);
                renderValidation = true;
                skipWindow.close();
            }
            skipWindow.center();
            skipWindow.show();
            return renderValidation;
        }
        return true;
    }

    function validateAutoAccept() {
        /**
        * Opens up window that shows how many items will be uploaded with the submission.
        * Allows user to accept or decline. Based on choice return boolean value.
        */
        var amountFiles = dcProperties.jobAttachments.userAddedInputFiles.get().concat(dcProperties.jobAttachments.autoDetectedInputFiles.get());
        var autoAcceptValidation = false;
        var autoAcceptWindow = new Window("dialog", "Job Attachments Upload Confirmation");
        var labelText = 'Job submission contains ' + amountFiles.length + " files. All files will be uploaded to S3 if they are not already present in the job attachments bucket."
        var autoAcceptLabel = autoAcceptWindow.add('statictext', undefined, labelText);
        autoAcceptWindow.skipButtonsGroup = autoAcceptWindow.add("group", undefined);
        autoAcceptWindow.skipButtonsGroup.orientation = "row";

        var buttonOK = autoAcceptWindow.skipButtonsGroup.add("button", undefined, "OK");
        buttonOK.size = [60, 20];
        var buttonCancel = autoAcceptWindow.skipButtonsGroup.add("button", undefined, "Cancel");
        buttonCancel.size = [60, 20];

        buttonCancel.onClick = function() {
            autoAcceptValidation = false;
            autoAcceptWindow.close();
        }

        buttonOK.onClick = function() {
            autoAcceptValidation = true;
            autoAcceptWindow.close();
        }
        autoAcceptWindow.center();
        autoAcceptWindow.show();

        return autoAcceptValidation;
    }

    function getDescription() {
        /**
        * Get description data from UI.
        * Returns either data or empty string, depending on the user given description.
        */
        if (descriptionGroup.textComment.text) {
            return descriptionGroup.textComment.text;
        }
        return "";
    }

    function checkGPUAccelType(submitScene, ignoreGPUAccelWarning) {
        var gpuType = app.project.gpuAccelType;
        var changeGPUType = false;

        if (!ignoreGPUAccelWarning && typeof gpuType != "undefined" && gpuType != GpuAccelType.SOFTWARE) {
            if (submitScene) {
                if (confirm("This After Effects project is currently configured to take advantage of gpu acceleration, which means every machine NEEDS a mercury enabled gpu.\n\nWould you like to disable this by changing it to 'Mercury Software Only'? Click 'YES' to temporarily convert this project to use CPU processing only. Click 'NO' to leave the setting as is and continue submission.\n\nThis warning can be disabled by toggling 'Ignore GPU Acceleration Warning' under the 'Advanced' tab.")) {
                    changeGPUType = true;
                }
            } else {
                if (confirm("This After Effects project is currently configured to take advantage of gpu acceleration, which means every machine NEEDS a mercury enabled gpu.\n\nWould you like to disable this by changing it to 'Mercury Software Only'? Click 'YES' to convert this project to use CPU processing only. Click 'NO' to leave the setting as is and continue submission.\n\nThis WILL NOT be reverted automatically after submission.\n\nThis warning can be disabled by toggling 'Ignore GPU Acceleration Warning' under the 'Advanced' tab.")) {
                    changeGPUType = true;
                    gpuType = null; // Since we don't want to restore the old value
                }
            }
            if (changeGPUType) {
                app.project.gpuAccelType = GpuAccelType.SOFTWARE;
            } else {
                gpuType = null;
            }
        } else {
            gpuType = null;
        }
        return gpuType;
    }

    function invertObject(jsObject) {
        /**
        * Inverts a given JavaScript object.
        * Only inverts the first level, does not handle nested objects properly.
        */
        var ret = {};
        for (var key in jsObject) {
            ret[jsObject[key]] = key;
        }
        return ret;
    }

    function getTempFile(fileName){
        /**
        * Return File instance from temporary directory with the given name.
        */
        var _tempFilePath = normalizePath(Folder.temp.fsName + "/" + fileName);
        var _tempFile = File(_tempFilePath);
        return _tempFile;
    }

    function wrappedCallSystem(cmd) {
        /**
        * Wraps system.callSystem command as required to get output from it.
        *
        * For Windows, wraps it into __two__ "cmd /c " calls.
        *
        * For MacOS, returns the command as-is.
        */
        if (system.osName == "MacOS") {
            return _wrappedCallSystemMac(cmd);
        }
        return _wrappedCallSystemWindows(cmd);
    }

    function _wrappedCallSystemWindows(cmd){

        var tempOutputFile = getTempFile("deadline_cloud_ae_pipe.txt");
        var tempBootstrapBatFile = getTempFile("aeCallSystemBootstrap.bat");
        var tempBatFile = getTempFile("aeCallSystem.bat");
        logger.debug("Command output path: " + tempOutputFile.fsName, scriptFileUtilName);
        _makeBootstrapBatFile(tempBootstrapBatFile, tempBatFile);
        // Wrapped command with error code output
        cmd = cmd + " > " + tempOutputFile.fsName;
        cmd += "\nIF %ERRORLEVEL% NEQ 0 ("
        cmd += "\n echo ERROR CODE: %ERRORLEVEL% >> " + tempOutputFile.fsName
        cmd += "\n)"
        cmd += "\nexit"
        tempBatFile.open("w");
        tempBatFile.writeln(cmd);
        tempBatFile.close();
        
        logger.debug("Running command (file):", scriptFileUtilName);
        logger.debug(tempBootstrapBatFile.fsName, scriptFileUtilName);
        logger.debug("Command: ", scriptFileUtilName);
        logger.debug(cmd, scriptFileUtilName);
        // Call bootstrap script and return result via intermediary file.
        system.callSystem(tempBootstrapBatFile.fsName);
        var output = system.callSystem("cmd /c \"type " + tempOutputFile.fsName + "\"");
        return output;
    }

    function _makeBootstrapBatFile(bootstrapFile, tempFile){
        var _cmd = "@echo off" + "\nstart /min /wait " + tempFile.fsName + "\nexit"
        bootstrapFile.open("w");
        bootstrapFile.writeln(_cmd);
        bootstrapFile.close();
    }

    function _wrappedCallSystemMac(cmd){
        // Add error code in the output if the command errors.
        cmd = cmd + " || echo \"ERROR CODE: $?\"";
        return system.callSystem(cmd);
    }

    function parseErrorData(output, cmd) {
        /**
        * Parses output string gotten from login/logout.
        * Depending on error code found or not return return_code, error message, result.
        * @param {string} output: String gotten from wrappedCallSystem. Contains error code and message.
        * @param {string} cmd: name of the command that calls upon this function. Used to write message.
        */

        var result = "";
        var message = "";
        var return_code = 0;
        var errorIndex = output.indexOf("ERROR CODE:");
        if (errorIndex !== -1) {
            // Extract the word and everything behind it
            result = output.substring(errorIndex);
            message = cmd + " Failed. Error has occurred.";
            var regex = /ERROR CODE:(.*)/;
            return_code = regex.exec(result);
            return {
                "return_code": return_code,
                "message": message,
                "result": result
            }
        }
        result = "";
        message = cmd + " Successful."
        return {
            "return_code": return_code,
            "message": message,
            "result": result
        }
    }
    
    function parseCredsData(output)
    {
        /**
        * Parses output string gotten from deadline creds status command.
        * @param {string} output: String gotten from wrappedCallSystem. Contains error code, data, and message.
        * Returns object with authentication status for credentials, status, and api.
        */
        var sourceRegex = /Source:\s*(.*?)(\n|$)/;
        var statusRegex = /Status:\s*(.*?)(\n|$)/;
        var apiRegex = /API Availability:\s*(.*?)(\n|$)/;

        var sourceMatch = getMatch(output, sourceRegex);
        var statusMatch = getMatch(output, statusRegex);
        var apiMatch = getMatch(output, apiRegex);
        return {
            "source": sourceMatch,
            "status": statusMatch,
            "api": apiMatch
        };
    }

    function parseListData(output) {
        /** Return object of <id>: <name> of some given CLI output. */

        var parsedObject = {};
        // Split string in array if lines
        var lines = output.split("\n");

        // loop through each line, and look for specific data.
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            // Check if the line contains a dash '-'
            if (line.indexOf('-') === 0) {
                // Look for 'queueID:' and 'displayName:' on the next lines
                var nextLineItemID = lines[i];
                var nextLineDisplayName = lines[i + 1];

                // Extract the data after 'queueID:' and 'displayName:'
                var itemIDData = nextLineItemID.substring(nextLineItemID.indexOf(':') + 1);
                itemIDData = itemIDData.replace(" ", "").trim();
                var displayNameData = nextLineDisplayName.substring(nextLineDisplayName.indexOf(':') + 1);
                displayNameData = displayNameData.replace(" '", "").replace("'", "").trim();

                parsedObject[itemIDData] = displayNameData;
                logger.debug('itemID found after dash: ' + itemIDData, scriptFileUtilName);
                logger.debug('DisplayName found after dash: ' + displayNameData, scriptFileUtilName);
            }
        }
        return parsedObject
    }

    function parseVersionData(output)
    {
        /**
        * Returns list of version numbers in the following order:
        [MAJOR, MINOR, PATCH]
        */
        // Regular expression to match "version " followed by version number
        var regex = /version\s+(\d+)\.(\d+)\.(\d+)/i;

        // Test if the inputString matches the pattern
        var parsedVersionNumberOutput = output.match(regex);

        // Output the result
        if (parsedVersionNumberOutput) 
        {
            var versionNumbers = [
                parseInt(parsedVersionNumberOutput[1]),  // Major
                parseInt(parsedVersionNumberOutput[2]),  // Minor
                parseInt(parsedVersionNumberOutput[3])  // Path
            ];
            return versionNumbers;
        } else
        {
            return [];
        }
    }

    function createExportBundleDir(exportBundleDir, fileName) {
        /**
        * Creates export bundle directory based on given job history directory and the name of the job.
        * Depending on error code found or not return return_code, error message, result.
        * @param {string} exportBundleDir: Job history directory
        * @param {string} fileName: Job name
        * Returns export directory
        */
        var partialDir = getPartialExportDir(exportBundleDir);
        var dir = getPath(partialDir, fileName, exportBundleDir);
        return dir.fsName;
    }

    function getConfigSettingData(config, setting) {
        /**
        * Parses config for specific setting name and returns data linked to the setting.
        * Depending on error code found or not return return_code, error message, result.
        * @param {Object} config: Config object.
        * @param {string} setting: Name of the setting to get data from
        * Returns data linked to setting name.
        */
        // Create a regular expression pattern with the search string
        var regexPattern = new RegExp(setting, 'g');

        // Use the match method to find all matches
        var matches = config.match(regexPattern);

        // If matches are found
        if (matches) {
            // Loop through each match
            for (var i = 0; i < matches.length; i++) {
                var match = matches[i];

                // Get the index of the match
                var matchIndex = config.indexOf(match);

                // Find the index of the next line break after the match
                var nextLineBreakIndex = config.indexOf('\n', matchIndex);

                // If a line break is found after the match
                if (nextLineBreakIndex !== -1) {
                    // Extract the next line after the match
                    var nextLine = config.substring(nextLineBreakIndex + 1, config.indexOf('\n', nextLineBreakIndex + 1));

                    // Return the next line
                    nextLine = nextLine.replace(/[\x0A\x0D]/g, '');
                    nextLine = trim(nextLine);
                    if (nextLine.length == 0) return null;
                    return nextLine;
                }
            }
        }
        // If no match is found, return null
        return null;
    }

    function getAWSProfileList(profilesString) {
        /**
        * Parses string data into an array.
        * @param {string} profilesString: Config object.
        * Returns array that contains all available profiles.
        */
        // Split the multi-line string into an array of lines
        var lines = profilesString.split('\n');

        // Create a list to store the lines
        var lineList = [];

        // Loop over each line and add it to the list
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            line = line.replace(/[\x0A\x0D]/g, '');
            line = trim(line);
            if (line == "default") {
                continue;
            }
            if (line.length == 0) {
                continue;
            }
            lineList.push(line);
        }
        return lineList;
    }

    function removeLineBreak(string) {
        /**
        * Replaces illegal characters in given string
        * @param {string} string: String that contains \n and \r
        * Returns parsed string with no illegal characters.
        */
        var newStr = "";

        // Loop and traverse string
        for (var i = 0; i < string.length; i++) {
            if (!(string[i] == "\n" || string[i] == "\r")) {
                newStr += string[i];
            }
        }
        return newStr;
    }

    function getMatchName(type, config_search_id) {
        /**
        * Looks for id match in list of possible id's. This for either 'Farm' or 'Queue' type.
        * @param {string} type: String that tells function to either check in farm list or queue list
        * @param {string} config_search_id: Farm or Queue id to check in id list.
        * Returns Object that contains boolean(match found or not) and farm/queue name the matched id is linked to
        */
        var result;
        var itemList = [];
        itemList.length = 0;
        if (type == "Farm") {
            logger.info('Retrieving data from dcProperties', scriptFileUtilName);
            result = dcUtil.invertObject(dcProperties.farmList.get());
        } else {
            result = dcUtil.invertObject(dcProperties.queueList.get());
        }
        var keys = Object.keys(result);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            itemList.push(key);
            result[key] = result[key].replace(/[\x0A\x0D]/g, '');
            if (config_search_id.indexOf(result[key]) !== -1) {
                logger.debug("Match found", scriptFileUtilName);
                return {
                    "match": true,
                    "keyName": key
                };
            }
            if (config_search_id.length === 0) {
                logger.debug("No default setting value found in config", scriptFileUtilName);
                return null;
            }
        }
        logger.debug("No Match found", scriptFileUtilName);
        return {
            "match": false,
            "keyName": null
        };
    }

    function setListBoxSelection(listbox, configData) {
        /**
        * Sets correct item selection in given listbox when name of the item matches config data name.
        * @param {Object} listbox: Listbox object that contains all possible farms/queues
        * @param {string} configData: Name of the default farm/queue
        */
        for (var i = 0; i < listbox.items.length; i++) {
            if (configData == listbox.items[i].text) {
                listbox.selection = i;
            }
        }
    }

    function getPath(toCheckDir, fileName, rootDir)
    {
        // 1. Find highest sequence number used for today.
        var splitDir = toCheckDir.split("//");
        var toCheckFolderName = splitDir[splitDir.length -1];
        var parentDir = toCheckDir.replace(toCheckFolderName, "");
        var mainDir = new Folder(parentDir);
        var subFolders = mainDir.getFiles();
        // var filePrefix = "2024-01-04-" // <-- this should come from today (new Date()... ?)
        var regex = new RegExp(toCheckFolderName + "(\\d+)-.*");
        // identical to /2024-01-04-(\d+)-.*/
        var maxSeqNumber = 0;
        var folderName = "";
        for (var idx = 0; idx < subFolders.length; idx++) {
            folderName = subFolders[idx].fullName
            var match = folderName.match(regex)
            if (!match) {
                continue;
            }
            var seqNr = parseInt(match[1]) // Convert first capture group to int
            if (seqNr > maxSeqNumber){
                maxSeqNumber = seqNr
            }
        }
        // 2. Create new export directory with next sequence number
        var nextSeqNumber = maxSeqNumber + 1
        // Sequence numbers under 10 are zero-padded.
        if(nextSeqNumber < 10)
        {
            nextSeqNumber = "0" + nextSeqNumber;
        }
        var folder = new Folder(toCheckDir + nextSeqNumber + "-AfterEffects-" + fileName);
        if(!folder.exists)
        {
            folder.create();
        }
        return folder;   
    }

    function getPartialExportDir(job_history_dir)
    {
        /**
        * Creates string with correct name and format to be used in job history directory creation.
        * @param {string} job_history_dir: Directory where job bundles is written to on submission.
        * Returns partial job history directory.
        */
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        // Zero pad all integers to a length of 2
        var month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Months are zero-based
        var day = ("0" + currentDate.getDate()).slice(-2);
        // Create the formatted string
        var formattedYearMonth = year + '-' + month;
        var formattedDate = year + '-' + month + '-' + day;
        var dir = job_history_dir + "//" + formattedYearMonth + "//" + formattedDate + "-";
        return dir;
    }

    function collectHostRequirements()
    {
        // Remark: gpu memory and worker memory need to be scaled with *1024, for some of the amount capabilities, the unit displayed on the UI is different
        // then the unit used within template, so use this factor to scale the input values.

        var hostRequirements = {
            "attributes": [
                {
                    "name": "attr.worker.os.family",
                    "anyOf": [
                        osGroup.OSDropdownList.selection.text.toLowerCase()
                    ]
                },
                {
                    "name": "attr.worker.cpu.arch",
                    "anyOf": [
                        cpuArchGroup.cpuDropdownList.selection.text
                    ]
                }
            ],
            "amounts": [
                {
                    "name": "amount.worker.vcpu",
                    "min": parseInt(cpuGroup.cpuMinText.text),
                    "max": parseInt(cpuGroup.cpuMaxText.text)
                },
                {
                    "name": "amount.worker.memory",
                    "min": parseInt(memoryGroup.memoryMinText.text) * 1024,
                    "max": parseInt(memoryGroup.memoryMaxText.text) * 1024
                },
                {
                    "name": "amount.worker.gpu",
                    "min": parseInt(gpuGroup.gpuMinText.text),
                    "max": parseInt(gpuGroup.gpuMaxText.text)
                },
                {
                    "name": "amount.worker.gpu.memory",
                    "min": parseInt(gpuMemoryGroup.gpuMemoryMinText.text) * 1024,
                    "max": parseInt(gpuMemoryGroup.gpuMemoryMaxText.text) * 1024
                },
                {
                    "name": "amount.worker.disk.scratch",
                    "min": parseInt(scratchSpaceGroup.scratchSpaceMinText.text),
                    "max": parseInt(scratchSpaceGroup.scratchSpaceMaxText.text)
                }
            ]
        }

        if(cpuArchGroup.cpuDropdownList.selection == 0 && osGroup.OSDropdownList.selection == 0)
        {
            delete hostRequirements.attributes;
        }
        else if(cpuArchGroup.cpuDropdownList.selection == 0)
        {
            hostRequirements.attributes.splice(1,1);
        }
        else if(osGroup.OSDropdownList.selection == 0)
        {
            hostRequirements.attributes.splice(0,1);
        }
        
        return hostRequirements;   
    }

    function deepCopy(obj) {
        /**
        * Creates deep copy of given object to avoid 2 copies overwriting one another.
        * @param {Object} obj: Given object that has to be copied. Extendscript does not have deep copy.
        * Returns deep copy of an object
        */
        if (obj === null || typeof obj !== 'object') {
          return obj;
        }
      
        if (obj instanceof Array) {
          var copyArray = [];
          for (var i = 0; i < obj.length; i++) {
            copyArray[i] = deepCopy(obj[i]);
          }
          return copyArray;
        }
      
        if (obj instanceof Object) {
          var copyObject = {};
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              copyObject[key] = deepCopy(obj[key]);
            }
          }
          return copyObject;
        }
    }

    function getActiveComp(itemName)
    {
        /**
        * Get the active comp item that matches given name.
        * @param {string} itemName: Target comp name.
        * Returns comp object that matches target comp name.
        */
        // If submit layers pressed -> itemName is not comp name and therefore comp will not be found with render command
        // Check if itemName is an available comp in the project, if not, it is a layer submission
        var comp = itemName;
        var compList = [];
        for (var i = 1; i <= app.project.rootFolder.items.length; i++) {
            var item = app.project.rootFolder.items[i];

            if (item instanceof CompItem ) {
                compList.push(app.project.activeItem.name);
            }
        }
        if(compList.indexOf(itemName) !== -1)
        {
            comp = app.project.activeItem.name;
        }
        return comp;
    }
    
    function normalizePath(path)
    {
        var _file = new File(path);
        if (system.osName == "MacOS") {
            _file.changePath(_file.fsName.replace(/\\/g, "/"));
            return _file.fsName;
        }
        // else: Windows
        _file.changePath(_file.fsName.replace(/\//g, "\\"));
        return _file.fsName;
    }

    function enforceForwardSlashes(path){
         return path.replace(/(\\)+/g, "/");
    }

    function removeIllegalCharacters(inputString)
    {
        var outputString = inputString.replace(/[.\-\s]/g, "_");

        return outputString;
    }
    
    function removePercentageFromFileName(fileName)
    {
        var fileName = fileName.replace(/%20/g, " ");
        return fileName;
    }

    function getDuplicateFrames(frameList)
    {
        /**
        * Checks for given frame list if duplicate frames are present.
        * @param {string} frameList: List of frames given in the UI or entire frame range of the comp.
        * Returns either array filled with duplicates, or if no duplicates have been found empty string.
        */
        var duplicates = [];
        var framesToRender = [];
        var splitList = frameList.split(",");

        for(var i = 0; i < splitList.length; i++)
        {
            if(splitList[i].indexOf("-") == -1)
            {
                if (arrayIncludes(framesToRender, parseInt(splitList[i])))
                {
                    duplicates.push(parseInt(splitList[i]));
                }
                else{
                    framesToRender.push(parseInt(splitList[i]));
                }
            }
            else
            {
                var numbers = splitList[i].split("-");
                if(parseInt(numbers[0]) > parseInt(numbers[1]))
                {
                    // Frame range is wrong, first frame is larger than second
                    duplicates.push(numbers[0]);
                    return duplicates;
                }
                for(var j = parseInt(numbers[0]); j < parseInt(numbers[1]) - parseInt(numbers[0]) + 1; j++)
                {
                   if(arrayIncludes(framesToRender, j))
                   {
                    duplicates.push(j);
                   }
                   else{
                    framesToRender.push(j);
                   }
                }
            }
        }
        return duplicates;
    }

    function arrayIncludes(array, value)
    {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return true;
            }
        }
        return false;
    }

    function getMatch(string, regex)
    {
        // Remove illegal characters from given string
        var match = string.match(regex);
        if(match && match[1])
        {
            var result = match[1].replace("\n", "").replace("\r", "");
        }
        return result;
    }

    function getUserDirectory(){
        /* Return OS specific user home directory. */
        if (system.osName == "MacOS") {
            return $.getenv("HOME")
        }
        // Windows:
        return $.getenv("USERPROFILE");
    }

    return {
        "invertObject": invertObject,
        "deadlineStringToArray": deadlineStringToArray,
        "toBooleanString": toBooleanString,
        "parseBool": parseBool,
        "trim": trim,
        "trimIllegalChars": trimIllegalChars,
        "sliderTextSync": sliderTextSync,
        "changeTextValue": changeTextValue,
        "changeSliderValue": changeSliderValue,
        "checkGPUAccelType": checkGPUAccelType,
        "spinBoxLimiterMin": spinBoxLimiterMin,
        "spinBoxLimiterMax": spinBoxLimiterMax,
        "getAssetsInScene": getAssetsInScene,
        "editTextIntValidation": editTextIntValidation,
        "getDescription": getDescription,
        "validateSkipExistingFrames": validateSkipExistingFrames,
        "validateAutoAccept": validateAutoAccept,
        "wrappedCallSystem": wrappedCallSystem,
        "parseErrorData": parseErrorData,
        "parseVersionData": parseVersionData,
        "parseCredsData": parseCredsData,
        "createExportBundleDir": createExportBundleDir,
        "parseListData": parseListData,
        "removeLineBreak": removeLineBreak,
        "getConfigSettingData": getConfigSettingData,
        "getMatchName": getMatchName,
        "getAWSProfileList": getAWSProfileList,
        "setListBoxSelection": setListBoxSelection,
        "getPath": getPath,
        "getPartialExportDir": getPartialExportDir,
        "collectHostRequirements": collectHostRequirements,
        "deepCopy": deepCopy,
        "getActiveComp": getActiveComp,
        "normalizePath": normalizePath,
        "normPath": normalizePath,
        "enforceForwardSlashes": enforceForwardSlashes,
        "removeIllegalCharacters": removeIllegalCharacters,
        "removePercentageFromFileName": removePercentageFromFileName,
        "getDuplicateFrames": getDuplicateFrames,
        "getTempFile": getTempFile,
        "getUserDirectory": getUserDirectory
    }
}

dcUtil = __generateUtil();



var LOG_LEVEL = {
    ERROR: 1,
    WARNING: 2,
    INFO: 3,
    DEBUG: 4
};

var LOG_LEVEL_MAP = dcUtil.invertObject(LOG_LEVEL)

// Global log level
// Set the desired logging level
var CURRENT_LOG_LEVEL = LOG_LEVEL.DEBUG;

var _DC_LOGGER_DEFAULT_MAX_BYTES = 10 * 1024 * 1024  // 10 MiB
var _DC_LOGGER_DEFAULT_BACKUP_COUNT = 5

function Logger(logFileName, logDirectoryPath, maxBytes, backupCount) {
    /**
     * Basic logger implementation with file rotation based on byte size.
     * 
     * Rollover implementation is based on Python's RotatingFileHandler for behavioural compatibility
     * with the Python-based submitters.
     *
     * The system will save old log files by appending the extensions ‘.1’, ‘.2’ etc., to the filename. 
     * For example, with a backupCount of 5 and a base file name of app.log, you would get 
     * app.log, app.log.1, app.log.2, up to app.log.5. The file being written to is always app.log. 
     * When this file is filled, it is closed and renamed to app.log.1, 
     * and if files app.log.1, app.log.2, etc. exist, then they are renamed to app.log.2, app.log.3 etc. respectively.
     * 
     * If backupCount or maxBytes are zero or less, rollover behaviour is disabled.
     * 
     * @param {string} logFileName - Log file name.
     * @param {string} logDirectoryPath - Log directory path.
     * @param {int} maxBytes - Number of bytes before a file rotation is performed.
     * @param {int} backupCount - Number of file rotations to keep.
     */

    var logFilePath;
    var logFile;

    function init() {
        maxBytes = maxBytes || _DC_LOGGER_DEFAULT_MAX_BYTES;
        backupCount = backupCount || _DC_LOGGER_DEFAULT_BACKUP_COUNT;
        logDirectoryPath = logDirectoryPath || dcUtil.getUserDirectory() + "/.deadline/logs/submitters";
        logDirectoryPath = dcUtil.normPath(logDirectoryPath);
        var folderObject = new Folder(logDirectoryPath);
        if (!folderObject.exists) {
            folderObject.create();
        }
        logFilePath = logDirectoryPath + "/" + logFileName;
        logFilePath = dcUtil.normPath(logFilePath);
        logFile = new File(logFilePath);
        _fileRotate();
    }
    init();

    function _fileRotate() {
        /* Performs a file rotation if the size of the active log file is higher
         * than maxBytes.
         * 
         * If maxBytes is zero or less, no file rotation will ever occur.
         */
        if (maxBytes <= 0) { // If maxBytes is invalid, don't rotate.
            return;
        }
        if (logFile.length < maxBytes) {
            return;
        }
        doRollover();
    }

    function doRollover() {
        /* Perform a file rollover. See above for the implementation details. */
        if (backupCount <= 0) {
            return;
        }
        // Rollover older files first
        var rolloverFile;
        for (var i = backupCount - 1; i > 0; i--) { // Last file does not need rollover, it is allowed to get overwritten.
            rolloverFile = new File(logDirectoryPath + logFileName + "." + i)
            if (!rolloverFile.exists) {
                continue;
            }
            var j = i + 1;
            var rolloverTargetPath = logDirectoryPath + logFileName + "." + j
            rolloverFile.copy(rolloverTargetPath);
        }
        // Rollover active file
        logFile.copy(logDirectoryPath + logFileName + "." + 1)
        logFile.open("w"); // Erase contents of active log file
        logFile.close();
    }

    function log(msg, src_module, level) {
        /**
         * Create logger that based on logging level writes information to logging file.
         * @param {string} msg - Information that needs to be written to log file.
         * @param {string} src_module - Name of the file where the logging function is being called.
         * @param {int} level - The value for the log level assigned to the message.
         */
        src_module = src_module || "undef";
        if (level <= CURRENT_LOG_LEVEL) {

            var levelName = LOG_LEVEL_MAP[level];
            // Check the length of the string
            var currentLength = levelName.length;

            // If the length is less than the target length, pad with spaces
            if (currentLength < 8) {
                var spacesToAdd = 8 - currentLength;
                for (var i = 0; i < spacesToAdd; i++) {
                    levelName += " ";
                }
            }
            var logMessage = getCurrentTimeAsStr() + " - " + "[" + levelName + "] " + " " + src_module + ": " + msg;

            logFile.open("a");
            logFile.writeln(logMessage);
            logFile.close();
            _fileRotate();
        }
    }

    function debug(msg, src_module) {
        log(msg, src_module, LOG_LEVEL.DEBUG);
    }

    function info(msg, src_module) {
        log(msg, src_module, LOG_LEVEL.INFO);
    }

    function warning(msg, src_module) {
        log(msg, src_module, LOG_LEVEL.WARNING);
    }

    function error(msg, src_module) {
        log(msg, src_module, LOG_LEVEL.ERROR);
    }

    return {
        "debug": debug,
        "info": info,
        "warning": warning,
        "warn": warning,
        "error": error,
        "err": error,
        "log": log,
        "doRollover": doRollover
    }
}

function getCurrentTimeAsStr() {
    var date = new Date();
    var year = date.getFullYear();
    // Zero pad all integers to a length of 2
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    var day = ("0" + date.getDate()).slice(-2);
    
    var currentDate = year + "-" + month + "-" + day;
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);
    var currentTime = hours + ":" + minutes + ":" + seconds;
    var logDateTime = currentDate + " " + currentTime;
    return logDateTime;
}


// Setup logger
var _scriptFileName = "OpenAeSubmitter.jsx";
var logFileName =  "aftereffects" + ".log";
var logDirectoryPath = dcUtil.getUserDirectory() + "/.deadline/logs/submitters/";
logDirectoryPath = dcUtil.normPath(logDirectoryPath)

var logger = Logger(logFileName, logDirectoryPath);
logger.log("Running driver file", _scriptFileName, LOG_LEVEL.INFO);

// THIS FILE IS AUTO-GENERATED BY "hatch_custom_hook.py".
// Manual changes in this file will be overwritten at build time.
var __DEADLINE_CLOUD_MINIMUM_VERSION__ = [0, 40, 0];



function __generateAeUtil() {

    function checkForIllegalCharCompName() {
        /*
        * Ensure no illegal chars are used in filePath/Name of comp name, 
        * and trim illegal characters.
        * Returns the new comp name without illegal characters
        */
        var results = [];

        var compItem;
        for (i = 1; i <= app.project.renderQueue.numItems; ++i) {
            if (app.project.renderQueue.item(i).status != RQItemStatus.QUEUED)
                continue;

            compItem = app.project.renderQueue.item(i).comp;
            if (compItem.name.length != (dcUtil.trimIllegalChars(compItem.name)).length) {
                results.push(compItem.name);

            }
        }
        return results;
    }

    function checkForWhiteSpaceCompName() {
        /*
        * Ensure no whitespace at start/end of comp name, and trim whitespace
        * Returns new comp name without whitespace
        */
        var results = [];

        var compItem;
        for (i = 1; i <= app.project.renderQueue.numItems; ++i) {
            // if (app.project.renderQueue.item(i).status != RQItemStatus.QUEUED)
            //     continue;

            compItem = app.project.renderQueue.item(i).comp;
            if (compItem.name.length != (dcUtil.trim(compItem.name)).length) {
                results.push(compItem.name);
            }
        }
        return results;
    }

    function getQueuedCompCount() {
        /*
        * Returns amount of items in the renderQueue
        */

        var count = 0;
        for (i = 1; i <= app.project.renderQueue.numItems; ++i) {
            if (app.project.renderQueue.item(i).status == RQItemStatus.QUEUED)
                count = count + 1;
        }
        return count;
    }

    function containsDuplicateComps() {
        /*
        * Ensure that no 2 queued comps in the Render Queue have the same name
        * Returns false if none found, returns true if duplicate name found
        */
        var duplicateFound = false;

        var compItem1;
        var compItem2;
        for (i = 1; i < app.project.renderQueue.numItems; ++i) {
            if (app.project.renderQueue.item(i).status != RQItemStatus.QUEUED)
                continue;
            compItem1 = app.project.renderQueue.item(i).comp;
            for (j = i + 1; j <= app.project.renderQueue.numItems; ++j) {
                
                if (app.project.renderQueue.item(j).status != RQItemStatus.QUEUED)
                    continue;

                compItem2 = app.project.renderQueue.item(j).comp;
                if (compItem1.name == compItem2.name) {
                    return true;
                }
            }
        }

        return duplicateFound;
    }

    function isLocal(path) {
        /** 
        * Checks if the given path is local or not => Function needs to be changed to work on other OS than windows
        * Possibly fix issue with hashing, assuming file is local
        * Returns false if path is not local, returns true if path is local
        * @param {string} path - Directory for file that needs to be checked
        */
        if (path.length >= 2) {
            var drive = path.substring(0, 1).toLowerCase();
            if (drive == "c" || drive == "d" || drive == "e")
                return true;
        }

        return false;
    }

    function checkCompOutputs(compIndex) {
        /**
        * Checks if path of the available comp items. 
        * Depending on if it is found or if it is local return warning string
        * @param {int} compIndex - Index of the specified comp in the list of renderQueue items
        */
        var outputWarnings = "";
        var compName = app.project.renderQueue.item(compIndex).comp.name;
        // Check output module(s)
        for (j = 1; j <= app.project.renderQueue.item(compIndex).numOutputModules; ++j) {
            var outputPath = app.project.renderQueue.item(compIndex).outputModule(j).file.fsName;

            var outputFile = File(outputPath);
            var outputFolder = Folder(outputFile.path);
            if (!outputFolder.exists)
                outputWarnings += "\n" + compName + ": The path for the output file \"" + outputPath + "\" does not exist.\n";
            else if (isLocal(outputPath))
                outputWarnings += "\n" + compName + ": The output file \"" + outputPath + "\" is local.\n";
        }

        return outputWarnings;
    }

    function runChecks()
    /**************** CHECKS ****************/
    {
        /** 
        * Functionality previously available in submitter. 
        * Produces warnings to tell user to do certain things before proceeding.
        */

        if(safeToRunScript)
        {
            runDeadlineVersionCheck();
        }
        
        // Check 1 - Ensure we are running at least version 8 (CS3).
        if (safeToRunScript) {
            while (version.indexOf('.') != version.lastIndexOf('.'))
                version = version.substring(0, version.lastIndexOf('.'));

            if (parseInt(version) < 8)
                safeToRunScript = false;

            if (!safeToRunScript)
                alert("This script only supports After Effects CS3 and later.");
        }

        // Check 2 - Ensure a project is open.
        if (safeToRunScript) {
            safeToRunScript = app.project != null;
            if (!app.project)
                alert("A project must be open to run this script.");
        }

        // Check 3 - Ensure the project has been saved in the past.
        if (safeToRunScript) {
            if (!app.project.file) {
                alert("This project must be saved before running this script.");
                safeToRunScript = false;
            }
        }

        // Check 4 - Ensure that at least 1 comp is queued, or that at least 1 layer is selected.
        if (safeToRunScript) {
            var queuedCount = getQueuedCompCount();
            var activeComp = app.project.activeItem;
            if(activeComp == null)
            {
                safeToRunScript = false;
                alert("You do not have any active composition.");
            }
        }

        // Check 5 - Ensure that no 2 comps in the Render Queue have the same name.
        if (safeToRunScript) {

            safeToRunScript = !containsDuplicateComps();
            if (!safeToRunScript)
                alert("At least 2 of your items in the Render Queue have the same name. Please ensure that all of your items have unique names.");
        }

        // Check 6 - Ensure no comp names contain whitespace at start or end of comp name.
        if (safeToRunScript) {
            var compNames = checkForWhiteSpaceCompName();
            if (compNames.length > 0)
            {
                safeToRunScript = false;
                alert("The following comp names contain starting/trailing whitespace characters. Ensure whitespace is removed prior to job submission:\n" + compNames.join());
            }
        }

        // Check 7 - Ensure no comp names contain any illegal file path characters.
        if (safeToRunScript) {
            var compNames = checkForIllegalCharCompName();
            if (compNames.length > 0)
            {
                safeToRunScript = false;
                alert("The following comp names contain illegal characters in their name. Ensure any invalid file path characters are removed prior to job submission:\n\n" + compNames.join());
            }
        }
        return safeToRunScript;
    }

    function runDeadlineVersionCheck() {
        var currentDeadlineVersion = dcDeadlineCommands.deadlineVersion();
        if(currentDeadlineVersion.length == 0)
        {
            safeToRunScript = false;
            alert("'deadline' is not recognized as an internal or external command, operable program or batch file.");
            return;
        }
        var errMsg = "The available Deadline version " +  currentDeadlineVersion[0] + "." + currentDeadlineVersion[1] + "." + currentDeadlineVersion[2] + " is not above target version " + __DEADLINE_CLOUD_MINIMUM_VERSION__[0] + "." + __DEADLINE_CLOUD_MINIMUM_VERSION__[1] + "." + __DEADLINE_CLOUD_MINIMUM_VERSION__[2];
        if (currentDeadlineVersion[0] < __DEADLINE_CLOUD_MINIMUM_VERSION__[0]) {
            safeToRunScript = false;
            alert(errMsg);
            return;
        }
        if (currentDeadlineVersion[1] < __DEADLINE_CLOUD_MINIMUM_VERSION__[1]) {
            safeToRunScript = false;
            alert(errMsg);
            return;
        }
        if (currentDeadlineVersion[2] < __DEADLINE_CLOUD_MINIMUM_VERSION__[2]) {
            safeToRunScript = false;
            alert(errMsg);
            return;
        }
    }

    return {
        "checkForIllegalCharCompName": checkForIllegalCharCompName,
        "checkForWhiteSpaceCompName": checkForWhiteSpaceCompName,
        "getQueuedCompCount": getQueuedCompCount,
        "containsDuplicateComps": containsDuplicateComps,
        "isLocal": isLocal,
        "checkCompOutputs": checkCompOutputs,
        "runChecks": runChecks
    }
}

dcAeUtil = __generateAeUtil();



function __generateDeadlineCommands() {

    // Script name used for logging
    var _scriptName = "DeadlineCommands.jsx";

    function login(profileName, deadlineMonitorPath) {
        var cmd = "deadline auth login";
        logger.debug("System call: " + cmd, _scriptName);
        var loginOutput = dcUtil.wrappedCallSystem(cmd);
        logger.debug(loginOutput, _scriptName)
        var loginParsedData = dcUtil.parseErrorData(loginOutput, "Login");

        logger.debug(loginParsedData.message + " " + loginParsedData.result, _scriptName);
        return {
            "return_code": loginParsedData.return_code,
            "message": loginParsedData.message,
            "result": loginParsedData.result
        }
    }
    
    function logout(profileName, deadlineMonitorPath) {
        var cmd = "deadline auth logout";
        logger.debug("System call: " + cmd, _scriptName);
        var logoutOutput = dcUtil.wrappedCallSystem(cmd);
        logger.debug(logoutOutput, _scriptName)
        var logoutParsedData = dcUtil.parseErrorData(logoutOutput, "Logout");

        logger.debug(logoutParsedData.message + " " + logoutParsedData.result, _scriptName);
        return {
            "return_code": logoutParsedData.return_code,
            "message": logoutParsedData.message,
            "result": logoutParsedData.result
        }
    }

    function listFarm(){
        logger.debug("System call: 'deadline farm list'", _scriptName);
        var listFarmOutput = dcUtil.wrappedCallSystem("deadline farm list");
        logger.debug(listFarmOutput, _scriptName);
        return dcUtil.parseListData(listFarmOutput);
    }

    function listQueue(farmID)
    {
        var cmdListQueue = "deadline queue list --farm-id " + farmID ;
        logger.debug("System call: " + cmdListQueue, _scriptName);
        var listQueueOutput = dcUtil.wrappedCallSystem(cmdListQueue);
        logger.debug(listQueueOutput, _scriptName);
        return dcUtil.parseListData(listQueueOutput);
    }

    function listProfiles()
    {
        logger.debug("System call: 'aws configure list-profiles'", _scriptName);
        var profilesOutput = dcUtil.wrappedCallSystem("aws configure list-profiles");
        logger.debug(profilesOutput, _scriptName)
        var profileList = dcUtil.getAWSProfileList(profilesOutput);
        return profileList;
    }

    function credentialStatus()
    {
        var cmdCreds = "deadline auth status";
        logger.debug("System call: " + cmdCreds, _scriptName);
        var credsOutput = dcUtil.wrappedCallSystem(cmdCreds);
        logger.debug(credsOutput, _scriptName);
        var credsParsedDataObject = dcUtil.parseCredsData(credsOutput);
        return {
            "source": credsParsedDataObject.source,
            "status": credsParsedDataObject.status,
            "api": credsParsedDataObject.api
        };
    }

    function apiProfileCheck(profileName)
    {
        var cmdAPI = "deadline farm list";
        logger.debug("System call: " + cmdAPI, _scriptName);
        var APIOutput = dcUtil.wrappedCallSystem(cmdAPI);
        logger.debug(APIOutput, _scriptName);
        var APIParsedDataObject = dcUtil.parseErrorData(APIOutput, "API Check");
        logger.debug(APIParsedDataObject.message + " " + APIParsedDataObject.result, _scriptName);
        return {
            "return_code": APIParsedDataObject.return_code,
            "message": APIParsedDataObject.message,
            "result": APIParsedDataObject.result
        }
    }

    function loginCheck()
    {
        logger.debug("System call: 'deadline farm list'", _scriptName);
        var cmdAPI = "deadline farm list";
        var APIOutput = dcUtil.wrappedCallSystem(cmdAPI);
        logger.debug(APIOutput, _scriptName);
        var APIParsedDataObject = dcUtil.parseErrorData(APIOutput, "Login Check");
        logger.debug(APIParsedDataObject.message + " " + APIParsedDataObject.result, _scriptName);
        return {
            "return_code": APIParsedDataObject.return_code,
            "message": APIParsedDataObject.message,
            "result": APIParsedDataObject.result
        }
    }
    
    function deadlineVersion()
    {
        logger.debug("System call: 'deadline --version'", _scriptName);
        var cmdVersion = "deadline --version"
        var versionOutput = dcUtil.wrappedCallSystem(cmdVersion);
        logger.debug(versionOutput, _scriptName);
        return dcUtil.parseVersionData(versionOutput);
    }

    return {
        "login": login,
        "logout": logout,
        "listFarm": listFarm,
        "listQueue": listQueue,
        "listProfiles": listProfiles,
        "apiProfileCheck": apiProfileCheck,
        "loginCheck": loginCheck,
        "deadlineVersion": deadlineVersion,
        "credentialStatus": credentialStatus
    }
}

dcDeadlineCommands = __generateDeadlineCommands();


function ObservableProperty(initialValue) {

    var _value = initialValue;
    var _listeners = [];


    function get() {
        return _value;
    }

    function set(newValue) {
        var oldValue = _value
        var _callback;
        for (var i = 0; i < _listeners.length; i++) {
            _callback = _listeners[i]
            _callback(newValue, oldValue)
        }
        _value = newValue
    }

    /**
     Add a listener to this property.

     Listeners should be functions that take at most two arguments:

        newValue: The new value for this property.
        oldValue: The old value for this property.

     --> newvalue, oldvalue
    */
    function add_listener(callback) {
        if (_listeners.indexOf(callback) < 0) {
            _listeners.push(callback)
        }
    }

    function remove_listener(callback) {
        var idx = _listeners.indexOf(callback)
        if (idx >= 0) {
            _listeners.splice(idx, 1)
        }
    }

    return {
        "get": get,
        "set": set,
        "add_listener": add_listener,
        "remove_listener": remove_listener
    }
}


function __generateProperties() {

    return {
        "defaultFarm": ObservableProperty(),
        "defaultQueue": ObservableProperty(),
        "isLoggedIn": ObservableProperty(),
        "isAPIAvailable": ObservableProperty(),
        "isWindowClosed": ObservableProperty(),
        "config": {
            aws_profile: ObservableProperty(),
            job_history_dir: ObservableProperty(),
            farm_id: ObservableProperty(),
            queue_id: ObservableProperty(),
            storage_profile_id: ObservableProperty(),
            job_attachments_file_system: ObservableProperty(),
            auto_accept: ObservableProperty(),
            conflict_resolution: ObservableProperty(),
            log_level: ObservableProperty(),
            deadline_cloud_monitor: ObservableProperty(),
        },
        "farmList": ObservableProperty(),
        "queueList": ObservableProperty(),
        "profileList": ObservableProperty(),
        "footageList": ObservableProperty(),
        "deadlineJobParameters": {
            description: ObservableProperty(),
            targetTaskRunStatus: ObservableProperty(),
            maxFailedTasksCount: ObservableProperty(),
            maxRetriesPerTask: ObservableProperty(),
            priority: ObservableProperty()
        },
        "jobAttachments": {
            autoDetectedInputFiles: ObservableProperty(),
            userAddedInputFiles: ObservableProperty(),
            autoDetectInputDirectories: ObservableProperty(), 
            userAddedInputDirectories: ObservableProperty(),
            autoDetectOutputDirectories: ObservableProperty(),
            userAddedOutputDirectories: ObservableProperty()
        },
        "footageLabels": {
            ADDED_FOOTAGE_ITEMS: ObservableProperty(),
            AUTO_DETECTED_FOOTAGE_ITEMS: ObservableProperty(),
            SELECTED_FOOTAGE_ITEMS: ObservableProperty()
        },
        "inputLabels": {
            ADDED_INPUT_ITEMS: ObservableProperty(),
            AUTO_DETECTED_INPUT_ITEMS: ObservableProperty(),
            SELECTED_INPUT_ITEMS: ObservableProperty()
        },
        "outputLabels": {
            ADDED_OUTPUT_ITEMS: ObservableProperty(),
            AUTO_DETECTED_OUTPUT_ITEMS: ObservableProperty(),
            SELECTED_OUTPUT_ITEMS: ObservableProperty()
        }, 
        "compName": ObservableProperty(),
        "credentialStatus": {
            source: ObservableProperty(),
            status: ObservableProperty(),
            api: ObservableProperty()
        }
    }
}

dcProperties = __generateProperties();


function __generateInitData()
{
    var scriptFileInitDataName = "InitData.jsx";
    
    function initDeadlineConfig()
    {
        // Retrieve the config data on startup.
        // Check if config is available and parse out result
        _dcConfig = dcUtil.wrappedCallSystem("deadline config show");
    
        dcProperties.config.aws_profile.set(dcUtil.getConfigSettingData(_dcConfig, "defaults.aws_profile_name"));
        // If job history has backslashes, `deadline auth login` will mangle the config path
        var _job_history = dcUtil.getConfigSettingData(_dcConfig, "settings.job_history_dir")
        _job_history = dcUtil.enforceForwardSlashes(_job_history)
        dcProperties.config.job_history_dir.set(_job_history);
        dcProperties.config.farm_id.set(dcUtil.getConfigSettingData(_dcConfig, "defaults.farm_id"));
        dcProperties.config.queue_id.set(dcUtil.getConfigSettingData(_dcConfig, "defaults.queue_id"));
        dcProperties.config.storage_profile_id.set(dcUtil.getConfigSettingData(_dcConfig, "settings.storage_profile_id"));
        dcProperties.config.job_attachments_file_system.set(dcUtil.getConfigSettingData(_dcConfig, "defaults.job_attachments_file_system"));
        dcProperties.config.auto_accept.set(dcUtil.getConfigSettingData(_dcConfig, "settings.auto_accept"));
        dcProperties.config.conflict_resolution.set(dcUtil.getConfigSettingData(_dcConfig, "settings.conflict_resolution"));
        dcProperties.config.log_level.set(dcUtil.getConfigSettingData(_dcConfig, "settings.log_level"));
        dcProperties.config.deadline_cloud_monitor.set(dcUtil.getConfigSettingData(_dcConfig, "deadline-cloud-monitor.path"));
    
        logger.debug("Config here ----------------------: \n" + _dcConfig, scriptFileInitDataName);
        logger.debug("Aws profile name: " + dcProperties.config.aws_profile.get(), scriptFileInitDataName);
        logger.debug("Job History Directory output: " + dcProperties.config.job_history_dir.get(), scriptFileInitDataName);
        logger.debug("Farm id output: " + dcProperties.config.farm_id.get(), scriptFileInitDataName);
        logger.debug("Queue id output: " + dcProperties.config.queue_id.get(), scriptFileInitDataName);
        logger.debug("Storage Profile output: " + dcProperties.config.storage_profile_id.get(), scriptFileInitDataName);
        logger.debug("Job Attachments FileSystem Options output: " + dcProperties.config.job_attachments_file_system.get(), scriptFileInitDataName);
        logger.debug("Auto Accept output: " + dcProperties.config.auto_accept.get(), scriptFileInitDataName);
        logger.debug("Conflict Resolution output: " + dcProperties.config.conflict_resolution.get(), scriptFileInitDataName);
        logger.debug("Log Level output: " + dcProperties.config.log_level.get(), scriptFileInitDataName);
        logger.debug("Deadline cloud monitor path: " + dcProperties.config.deadline_cloud_monitor.get(), scriptFileInitDataName);
    
        // Set logging level to the default setting found in the config
        var loggingIndex = LOG_LEVEL[dcProperties.config.log_level.get()];
        CURRENT_LOG_LEVEL = loggingIndex;
        logger.error("Logging level changed to: " + dcProperties.config.log_level.get(), scriptFileInitDataName);
    }
    
    function initDeadlineFarmData(){
        // result = empty object if unsuccessful
        var result = dcDeadlineCommands.listFarm();
        dcProperties.farmList.set(result);
        if(!Object.keys(result).length){
            // No farm list means we don't need to query queues.
            dcProperties.queueList.set({})
            return
        }
        var farmId = dcProperties.config.farm_id.get();
        var result = dcDeadlineCommands.listQueue(farmId);
        dcProperties.queueList.set(result);
    }
    
    function initDeadlineProfiles(){
        // Query Available Deadline Cloud Profiles
        var result = dcDeadlineCommands.listProfiles();
        dcProperties.profileList.set(result);
    }

    function initAutoDetectFootageItems()
    {
        dcProperties.jobAttachments.autoDetectedInputFiles.set([]);
        var detectedItemsList = [];
        if (dcProperties.jobAttachments.autoDetectedInputFiles.get().indexOf(projectPath) == -1) {
            detectedItemsList.push(projectPath);
            logger.debug("Added project file path to auto detect list:  " + projectPath, scriptFileInitDataName);
        }

        for (var i = 1; i < app.project.numItems; i++) {
            var item = app.project.item(i);
            var directoryPath = item.file;
            if (item instanceof FootageItem) {
                // Check if footage item has a file associated with it. If not, do not add to list.
                if (directoryPath) {
                    var key = directoryPath.fsName;
                    // Check if item is already in the list.
                    if (detectedItemsList.indexOf(key) !== -1) {
                        // Do nothing and go to the next item. I will not add an alert, or this will get very spammy.
                        logger.debug("Auto detected footage is already in the list:  " + key, scriptFileInitDataName);
                        continue;
                    }
                    detectedItemsList.push(key);
                    logger.debug("Auto Detected Footage: " + key, scriptFileInitDataName);
                }
            }
        }
        dcProperties.jobAttachments.autoDetectedInputFiles.set(detectedItemsList);
    }

    function initAutoDetectOutputDirectories()
    {
        var detectedOutputDirectories= [];
        // reset list
        dcProperties.jobAttachments.autoDetectOutputDirectories.set([]);

        for (var i = 1; i <= app.project.renderQueue.numItems; i++)
        {
            // Get output directory for current renderQueueItem
            var renderQItem = app.project.renderQueue.item(i);
            var itemPath = dcSubmitButton.getCompleteDirectory(renderQItem);
            logger.debug("Selected item path:" + itemPath, scriptFileInitDataName);
            if(detectedOutputDirectories.indexOf(itemPath) !== -1)
            {
                // File is already in the list, do not add it and continue to the next item
                continue;
            }
            detectedOutputDirectories.push(itemPath);
        }
        dcProperties.jobAttachments.autoDetectOutputDirectories.set(detectedOutputDirectories);
    }

    function loadingUIWindow()
    {
        // Create a new window
        var dialog = new Window("palette", "Loading UI", undefined, {resizeable: true});
        dialog.size = [250,100];
        label = dialog.add("statictext", undefined, "Loading UI in progress.")
        label.size = [200, 20];
        // Create Progress Bar for Submission Button
        progressBar = dialog.add('progressbar', undefined, '');
        progressBar.size = [200, 20];
        progressBar.value = 0;

        // Show the window
        dialog.show();
        return dialog;
    }
    
    function loadingLoginWindow()
    {
        // Create a new window
        var loginWindow = new Window("palette", " ", undefined, {resizeable: true});
        loginWindow.size = [250,50];
        label = loginWindow.add("statictext", undefined, "Logging in to Deadline Cloud Monitor.")
        label.size = [200, 20];

        // Show the window
        loginWindow.show();
        return loginWindow;
    }
    
    return {
        "initDeadlineConfig": initDeadlineConfig,
        "initDeadlineFarmData": initDeadlineFarmData,
        "initDeadlineProfiles": initDeadlineProfiles,
        "initAutoDetectFootageItems": initAutoDetectFootageItems,
        "initAutoDetectOutputDirectories": initAutoDetectOutputDirectories,
        "loadingUIWindow": loadingUIWindow,
        "loadingLoginWindow": loadingLoginWindow
    }
}

dcInitData = __generateInitData();


var OPENJD_ASSET_REFERENCE =
{
    "assetReferences": {
        "inputs": {
            "directories": [],
            "filenames": []
        },
        "outputs": {
            "directories": []
        },
        "referencedPaths": []
    }
}


function __generateDataTemplate() {
    var Frames = 
    {
        "name": "Frames",
        "type": "STRING",
        "userInterface": {
            "control": "LINE_EDIT",
            "label": "Frames",
            "groupLabel": "After Effects Settings"
        },
        "description": "The frames to render. E.g. 1,8,11",
        "minLength": 1
    }
    var OutputPattern =
    {
        "name": "OutputPattern",
        "type": "STRING",
        "description": "Name for the output file.",
        "default": "Output_[####]"
    }
    var OutputFormat =
    {
        "name": "OutputFormat",
        "type": "STRING",
        "description": "File type.",
        "default": "png"
    }
    var CompName =
    {
        "name": "CompName",
        "type": "STRING",
        "description": "Selected composition to render."
    }
    var OutputFilePath =
    {
        "name": "OutputFilePath",
        "type": "PATH",
        "objectType": "DIRECTORY",
        "dataFlow": "OUT",
        "userInterface": {
            "control": "CHOOSE_DIRECTORY",
            "label": "Output File Path",
            "groupLabel": "After Effects Settings"
        },
        "description": "The render output path."
    }
    return {
        "Frames": Frames,
        "OutputPattern" : OutputPattern,
        "OutputFormat": OutputFormat,
        "CompName": CompName,
        "OutputFilePath": OutputFilePath
    }
}

dcDataTemplate = __generateDataTemplate();


var OPENJD_TEMPLATE = {
    "specificationVersion": "jobtemplate-2023-09",
    "name": "After Effects Template Edit Test",
    "description": null,
    "parameterDefinitions": [{
            "name": "AfterEffectsProjectFile",
            "type": "PATH",
            "objectType": "FILE",
            "dataFlow": "IN",
            "userInterface": {
                "control": "CHOOSE_INPUT_FILE",
                "label": "After Effects Project File",
                "groupLabel": "After Effects Settings",
                "fileFilters": [{
                        "label": "After Effects Project Files",
                        "patterns": [
                            "*.aep",
                            "*.aepx"
                        ]
                    },
                    {
                        "label": "All Files",
                        "patterns": [
                            "*"
                        ]
                    }
                ]
            },
            "description": "The After Effects Project file to render."
        },
        {
            "name": "Frames",
            "type": "STRING",
            "userInterface": {
                "control": "LINE_EDIT",
                "label": "Frames",
                "groupLabel": "After Effects Settings"
            },
            "description": "The frame range to render. E.g. 1,8,11",
            "minLength": 1
        },
        {
            "name": "OutputPattern",
            "type": "STRING",
            "description": "Name for the output file.",
            "default": "Output_[####]"
        },
        {
            "name": "OutputFormat",
            "type": "STRING",
            "description": "File type.",
            "default": "png"
        },
        {
            "name": "CompName",
            "type": "STRING",
            "description": "Selected composition to render."
        },
        {
            "name": "OutputFilePath",
            "type": "PATH",
            "objectType": "DIRECTORY",
            "dataFlow": "OUT",
            "userInterface": {
                "control": "CHOOSE_DIRECTORY",
                "label": "Output File Path",
                "groupLabel": "After Effects Settings"
            },
            "description": "The render output path."
        }
    ],
    "steps": [{
        "name": "AfterEffects Simple Render",
        "parameterSpace": {
            "taskParameterDefinitions": [
                {
                  "name": "Frame",
                  "type": "INT",
                  "range": "{{Param.Frames}}"
                }
            ]
        },
        "stepEnvironments": [{
            "name": "AfterEffects",
            "description": "Runs After Effects in the background.",
            "script": {
                "embeddedFiles": [
                    {
                        "name": "initData",
                        "filename": "init-data.yaml",
                        "type": "TEXT",
                        "data": "project_file: {{Param.AfterEffectsProjectFile}} \n"

                    },
                    {
                        "name": "runStart",
                        "filename": "start.bat",
                        "type": "TEXT",
                        "data": "afterfx-openjd daemon start --connection-file {{Session.WorkingDirectory}}/connection.json --init-data file://{{Env.File.initData}} \n"
                    },
                    {
                        "name": "runStop",
                        "filename": "stop.bat",
                        "type": "TEXT",
                        "data": "afterfx-openjd daemon stop --connection-file {{Session.WorkingDirectory}}/connection.json \n"
                    }
                ],
                "actions": {
                    "onEnter": {
                        "command": "powershell",
                        "args": [
                            "{{Env.File.runStart}}"
                        ]
                    },
                    "onExit": {
                        "command": "powershell",
                        "args": [
                            "{{Env.File.runStop}}"
                        ]
                    }
                }
            }
        }],
        "script": {
            "actions": {
                "onRun": {
                    "command": "powershell",
                    "args": [
                        "{{Task.File.runScript}}"
                    ]
                }
            },
            "embeddedFiles": [
            {
                "name": "runData",
                "filename": "run-data.yaml",
                "type": "TEXT",
                "data": [
                    "frame: {{Task.Param.Frame}}"
                ]
            },
            {
                "name": "runScript",
                "filename": "bootstrap.bat",
                "type": "TEXT",
                "runnable": true,
                "data": "afterfx-openjd daemon run --connection-file {{ Session.WorkingDirectory }}/connection.json --run-data file://{{Task.File.runData}} \n"
            }
            ]
        }
    }]
}

var OPENJD_TEMPLATE_LAYER = {
    "specificationVersion": "jobtemplate-2023-09",
    "name": "After Effects Template Edit Test",
    "description": null,
    "parameterDefinitions": [{
            "name": "AfterEffectsProjectFile",
            "type": "PATH",
            "objectType": "FILE",
            "dataFlow": "IN",
            "userInterface": {
                "control": "CHOOSE_INPUT_FILE",
                "label": "After Effects Project File",
                "groupLabel": "After Effects Settings",
                "fileFilters": [{
                        "label": "After Effects Project Files",
                        "patterns": [
                            "*.aep",
                            "*.aepx"
                        ]
                    },
                    {
                        "label": "All Files",
                        "patterns": [
                            "*"
                        ]
                    }
                ]
            },
            "description": "The After Effects Project file to render."
        },
        {
            "name": "Frames",
            "type": "STRING",
            "userInterface": {
                "control": "LINE_EDIT",
                "label": "Frames",
                "groupLabel": "After Effects Settings"
            },
            "description": "The frame range to render. E.g. 1,8,11",
            "minLength": 1
        },
        {
            "name": "OutputPattern",
            "type": "STRING",
            "description": "Name for the output file.",
            "default": "Output_[####]"
        },
        {
            "name": "OutputFormat",
            "type": "STRING",
            "description": "File type.",
            "default": "png"
        },
        {
            "name": "CompName",
            "type": "STRING",
            "description": "Selected composition to render."
        },
        {
            "name": "OutputFilePath",
            "type": "PATH",
            "objectType": "DIRECTORY",
            "dataFlow": "OUT",
            "userInterface": {
                "control": "CHOOSE_DIRECTORY",
                "label": "Output File Path",
                "groupLabel": "After Effects Settings"
            },
            "description": "The render output path."
        }
    ],
    "steps": [{
        "name": "AfterEffects Simple Render",
        "parameterSpace": {
            "taskParameterDefinitions": {
                "name": "Frame",
                "type": "INT",
                "range": "{{Param.Frames}}"
            }
        },
        "stepEnvironments": [{
            "name": "AfterEffects",
            "description": "Runs After Effects in the background.",
            "script": {
                "embeddedFiles": [
                    {
                        "name": "initData",
                        "filename": "init-data.yaml",
                        "type": "TEXT",
                        "data": [
                            "project_file: {{Param.AfterEffectsProjectFile}} \n",
                            "comp_name: {{Param.CompName}} \n",
                            "output_file_path: {{Param.OutputFilePath}} \n",
                            "output_pattern: {{Param.OutputPattern}} \n",
                            "output_format: {{Param.OutputFormat}} \n"
                        ]
                    },
                    {
                        "name": "runStart",
                        "filename": "start.bat",
                        "type": "TEXT",
                        "data": "afterfx-openjd daemon start --connection-file {{Session.WorkingDirectory}}/connection.json --init-data file://{{Env.File.initData}} \n"
                    },
                    {
                        "name": "runStop",
                        "filename": "stop.bat",
                        "type": "TEXT",
                        "data": "afterfx-openjd daemon start --connection-file {{Session.WorkingDirectory}}/connection.json \n"
                    }
                ],
                "actions": {
                    "onEnter": {
                        "command": "powershell",
                        "args": [
                            "{{Env.File.runStart}}"
                        ]
                    },
                    "onExit": {
                        "command": "powershell",
                        "args": [
                            "{{Env.File.runStop}}"
                        ]
                    }
                }
            }
        }],
        "script": {
            "actions": {
                "onRun": {
                    "command": "powershell",
                    "args": [
                        "{{Task.File.runScript}}"
                    ]
                }
            },
            "embeddedFiles": [
            {
                "name": "runData",
                "filename": "run-data.yaml",
                "type": "TEXT",
                "data": [
                    "frame: {{Task.Param.Frame}}"
                ]
            },
            {
                "name": "runScript",
                "filename": "bootstrap.bat",
                "type": "TEXT",
                "runnable": true,
                "data": "afterfx-openjd daemon run --connection-file {{ Session.WorkingDirectory }}/connection.json --run-data file://{{Task.File.runData}} \n"
            }
            ]
        }
    }]
}


var farmID = "";
var queueID = "";

var _submitSubmitBundle = "SubmitBundle.jsx";

function createSubmission(jobTemplate, jobParameters, jobAssetReferences, job_history_dir, fileName) {
    // Force save the file, because certain settings are not applied when not saved.
    app.project.save();

    var jobHistoryFolderDirectory = createJobHistoryFolders(job_history_dir, fileName);
    logger.debug(jobHistoryFolderDirectory.fsName, _submitSubmitBundle);
    createBundle(jobHistoryFolderDirectory.fsName, jobTemplate, jobParameters, jobAssetReferences);
    var submissionResult = submitBundle(jobHistoryFolderDirectory.fsName);
    return submissionResult;
}

function createBundle(target_directory, jobTemplate, jobParameters, jobAssetReferences) {
    /**
     * Create necessary files and folders for the job bundle
     * @param {string} target_directory: Bundle files in provided directory
     */
    var templateOutDir = dcUtil.normPath(target_directory + "/template.json");
    var paramOutDir = dcUtil.normPath(target_directory + "/parameter_values.json");
    var assetRefOutDir = dcUtil.normPath(target_directory + "/asset_references.json");
    writeJSONFile(jobTemplate, templateOutDir);
    writeJSONFile(jobParameters, paramOutDir);
    writeJSONFile(jobAssetReferences, assetRefOutDir);
}

function writeJSONFile(jsonData, filePath) {
    /**
     * @param {object} jsonData: Object containing data from UI that needs to overwrite existing parameter_value.json data
     * @param {string} filePath: Temporary files/folder location
     */
    var file = File(filePath);
    file.open('w');
    file.write(JSON.stringify(jsonData, null, 4));
    file.close();
}

function submitBundle(bundle_dir) {
    /**
     * Submit job bundle to Deadline Cloud through commandline call.
     * @param {string} bundle_dir: Template files/folder location
     */
    farmID = dcProperties.config.farm_id.get();
    queueID = dcProperties.config.queue_id.get();

    var command = 'deadline bundle submit \"' + bundle_dir + '\" --farm-id ' + farmID + ' --queue-id ' + queueID + ' --yes ';
    logger.debug("Calling command: " + command, _submitSubmitBundle);

    var commandOutput = dcUtil.wrappedCallSystem(command);
    logger.debug("Command Output: " + commandOutput, _submitSubmitBundle);
    // Parsing output
    var submitParsedData = dcUtil.parseErrorData(commandOutput, "Submit");
    logger.debug(submitParsedData.message + " " + submitParsedData.result, _submitSubmitBundle);
    return submitParsedData.return_code == 0
}

function deleteDirectory(target_dir) {
    /**
     * Checks if specific folder and files in a directory exist, if so deletes them.
     * @param {stromg} target_dir: Temporary files/folder location
     */

    var destinationFolder = new Folder(target_dir);
    var fileList = destinationFolder.getFiles();
    for (var i = 0; i < fileList.length; i++) {
        if (fileList[i].exists) {
            fileList[i].remove();
        }
    }
    if (destinationFolder.exists) {
        destinationFolder.remove();
        logger.info("Deleted given temp directory folder.", _submitSubmitBundle);
    }
}

function createJobHistoryFolders(job_history_dir, fileName) {
    /**
     * Creates folders based on given directory. If folders exists do not exist, create the;.
     * Returns the directory string.
     */
    var partialDir = dcUtil.getPartialExportDir(job_history_dir);
    var dir = dcUtil.getPath(partialDir, fileName);
    return dir;
}

function copyFiles(source, destination) {
    /**
     * Will copy template.yaml and parameter_values.json from target location into temporary location.
     * @param {string} source: Source directory path
     * @param {string} destination: Destination directory path for created temp folder and files.
     */

    var sourceFolder = new Folder(source);
    var destinationFolder = new Folder(destination);

    // Check if the source folder exists
    if (!sourceFolder.exists) {
        alert("Source folder does not exist!");
    }

    // Create the destination folder if it doesn't exist
    if (!destinationFolder.exists) {
        destinationFolder.create();
    }

    // Get all files and subfolders in the source folder
    var files = sourceFolder.getFiles();
    // Loop through files and folders
    for (var i = 0; i < files.length; i++) {
        if (files[i] instanceof File) {
            // Copy files
            var _filePath = dcUtil.normPath(destination + "/" + files[i].name);
            files[i].copy(_filePath);
        } else if (files[i] instanceof Folder) {
            // Recursively copy subfolders
            copyFiles(files[i].fsName, destinationFolder.fsName + "/" + files[i].name);
        }
    }
}


/**
This file is sourced from https://github.com/ExtendScript/extendscript-es5-shim .

This file is provided under the MIT license which is reproduced here:

  The MIT License (MIT)

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
//every.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
*/
if (!Array.prototype.every) {
  Array.prototype.every = function(callback, thisArg) {
    var T, k;

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.every called on null or undefined');
    }

    // 1. Let O be the result of calling ToObject passing the this 
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method
    //    of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    T = (arguments.length > 1) ? thisArg : void 0;

    // 6. Let k be 0.
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method
        //    of O with argument Pk.
        kValue = O[k];

        // ii. Let testResult be the result of calling the Call internal method
        //     of callback with T as the this value and argument list 
        //     containing kValue, k, and O.
        var testResult = callback.call(T, kValue, k, O);

        // iii. If ToBoolean(testResult) is false, return false.
        if (!testResult) {
          return false;
        }
      }
      k++;
    }
    return true;
  };
}
//filter.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
*/
if (!Array.prototype.filter) {
  Array.prototype.filter = function(callback, thisArg) {

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.filter called on null or undefined');
    }

    var t = Object(this);
    var len = t.length >>> 0;

    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    var res = [];

    var T = (arguments.length > 1) ? thisArg : void 0;
    
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];

        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (callback.call(T, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}
//forEach.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {


        if (this === void 0 || this === null) {
            throw new TypeError('Array.prototype.forEach called on null or undefined');
        }

        // 1. Let O be the result of calling toObject() passing the
        // |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get() internal
        // method of O with the argument "length".
        // 3. Let len be toUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If isCallable(callback) is false, throw a TypeError exception. 
        // See: http://es5.github.com/#x9.11
        if (callback.__class__ !== 'Function') {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let
        // T be undefined.
        var T = (arguments.length > 1) ? thisArg : void 0;


        // 6. Let k be 0
        //k = 0;

        // 7. Repeat, while k < len
        for (var k = 0; k < len; k++) {
            var kValue;
            // a. Let Pk be ToString(k).
            //    This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty
            //    internal method of O with argument Pk.
            //    This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {
                // i. Let kValue be the result of calling the Get internal
                // method of O with argument Pk.
                kValue = O[k];
                // ii. Call the Call internal method of callback with T as
                // the this value and argument list containing kValue, k, and O.
                callback.call(T, kValue, k, O);
            }
        }
        // 8. return undefined
    }
}
//isArray.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
*/
if (!Array.isArray) {
  Array.isArray = function(arg) {

    if (arg === void 0 || arg === null) {
      return false;
    }
  	return (arg.__class__ === 'Array');
  };
}
//indexOf.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {


    // 1. Let o be the result of calling ToObject passing
    //    the this value as the argument.
    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.indexOf called on null or undefined');
    }

    var k;
    var o = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of o with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = o.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of o with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of o with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in o && o[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}
//lastIndexOf.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.15
// Reference: http://es5.github.io/#x15.4.4.15
if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = function(searchElement, fromIndex) {

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.lastIndexOf called on null or undefined');
    }

    var n, k,
      t = Object(this),
      len = t.length >>> 0;
    if (len === 0) {
      return -1;
    }

    n = len - 1;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n != n) {
        n = 0;
      }
      else if (n != 0 && n != Infinity && n != -Infinity) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }

    for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  };
}
//reduce.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(callback, initialValue) {

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
    }

    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    var t = Object(this), len = t.length >>> 0, k = 0, value;

    if (arguments.length > 1) 
      {
        value = initialValue;
      } 
    else 
      {
        while (k < len && !(k in t)) {
          k++; 
        }
        if (k >= len) {
          throw new TypeError('Reduce of empty array with no initial value');
        }
        value = t[k++];
      }

    for (; k < len; k++) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
}
//some.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.17
// Reference: http://es5.github.io/#x15.4.4.17
if (!Array.prototype.some) {
  Array.prototype.some = function(callback, thisArg) {

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.some called on null or undefined');
    }

    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    var t = Object(this);
    var len = t.length >>> 0;

    var T = arguments.length > 1 ? thisArg : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t && callback.call(T, t[i], i, t)) {
        return true;
      }
    }

    return false;
  };
}
//bind.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill

WARNING! Bound functions used as constructors NOT supported by this polyfill!
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Bound_functions_used_as_constructors
*/
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (this.__class__ !== 'Function') {
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype; 
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}
//reduceRight.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.22
// Reference: http://es5.github.io/#x15.4.4.22
if (!Array.prototype.reduceRight) {
  Array.prototype.reduceRight = function(callback, initialValue) {

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.reduceRight called on null or undefined');
    }

    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    var t = Object(this), len = t.length >>> 0, k = len - 1, value;
    if (arguments.length > 1) 
      {
        value = initialValue;
      } 
    else 
      {
        while (k >= 0 && !(k in t)) {
          k--;
        }
        if (k < 0) {
          throw new TypeError('Reduce of empty array with no initial value');
        }
        value = t[k--];
      }
      
    for (; k >= 0; k--) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
}
//map.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.map called on null or undefined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| 
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal 
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    T = (arguments.length > 1) ? thisArg : void 0;

    // 6. Let A be a new array created as if by the expression new Array(len) 
    //    where Array is the standard built-in constructor with that name and 
    //    len is the value of len.
    A = new Array(len);

    for (var k = 0; k < len; k++) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal 
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal 
        //     method of callback with T as the this value and argument 
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
    }
    // 9. return A
    return A;
  };
}
//toISOString.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
*/
if (!Date.prototype.toISOString) {
  (function() {

    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }

    Date.prototype.toISOString = function() {
      return this.getUTCFullYear() +
        '-' + pad(this.getUTCMonth() + 1) +
        '-' + pad(this.getUTCDate()) +
        'T' + pad(this.getUTCHours()) +
        ':' + pad(this.getUTCMinutes()) +
        ':' + pad(this.getUTCSeconds()) +
        '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
        'Z';
    };

  }());
}
//trim.js
/*
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
*/
if (!String.prototype.trim) {
	// Вырезаем BOM и неразрывный пробел
	String.prototype.trim = function() {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}
//create.js
if (!Object.create) {
  // Production steps of ECMA-262, Edition 5, 15.2.3.5
  // Reference: http://es5.github.io/#x15.2.3.5
  Object.create = (function() {
    // To save on memory, use a shared constructor
    function Temp() {}

    // make a safe reference to Object.prototype.hasOwnProperty
    var hasOwn = Object.prototype.hasOwnProperty;

    return function(O) {
      // 1. If Type(O) is not Object or Null throw a TypeError exception.
      if (Object(O) !== O && O !== null) {
        throw TypeError('Object prototype may only be an Object or null');
      }

      // 2. Let obj be the result of creating a new object as if by the
      //    expression new Object() where Object is the standard built-in
      //    constructor with that name
      // 3. Set the [[Prototype]] internal property of obj to O.
      Temp.prototype = O;
      var obj = new Temp();
      Temp.prototype = null; // Let's not keep a stray reference to O...

      // 4. If the argument Properties is present and not undefined, add
      //    own properties to obj as if by calling the standard built-in
      //    function Object.defineProperties with arguments obj and
      //    Properties.
      if (arguments.length > 1) {
        // Object.defineProperties does ToObject on its first argument.
        var Properties = Object(arguments[1]);
        for (var prop in Properties) {
          if (hasOwn.call(Properties, prop)) {
            var descriptor = Properties[prop];
            if (Object(descriptor) !== descriptor) {
              throw TypeError(prop + 'must be an object');
            }
            if ('get' in descriptor || 'set' in descriptor) {
              throw new TypeError('getters & setters can not be defined on this javascript engine');
            }
            if ('value' in descriptor) {
              obj[prop] = Properties[prop].value;
            }

          }
        }
      }

      // 5. Return obj
      return obj;
    };
  })();
}

//defineProperties.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties#Polyfill
*/
if (!Object.defineProperties) {

  Object.defineProperties = function(object, props) {

    function hasProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    function convertToDescriptor(desc) {

      if (Object(desc) !== desc) {
        throw new TypeError('Descriptor can only be an Object.');
      }


      var d = {};

      if (hasProperty(desc, "enumerable")) {
        d.enumerable = !!desc.enumerable;
      }

      if (hasProperty(desc, "configurable")) {
        d.configurable = !!desc.configurable;
      }

      if (hasProperty(desc, "value")) {
        d.value = desc.value;
      }

      if (hasProperty(desc, "writable")) {
        d.writable = !!desc.writable;
      }

      if (hasProperty(desc, "get")) {
        throw new TypeError('getters & setters can not be defined on this javascript engine');
      }

      if (hasProperty(desc, "set")) {
        throw new TypeError('getters & setters can not be defined on this javascript engine');
      }

      return d;
    }

    if (Object(object) !== object) {
      throw new TypeError('Object.defineProperties can only be called on Objects.');
    }

    if (Object(props) !== props) {
      throw new TypeError('Properties can only be an Object.');
    }

    var properties = Object(props);
    for (propName in properties) {
      if (hasOwnProperty.call(properties, propName)) {
        var descr = convertToDescriptor(properties[propName]);
        object[propName] = descr.value;
      }
    }
    return object;
  }
}
//defineProperty.js
if (!Object.defineProperty) {

    Object.defineProperty = function defineProperty(object, property, descriptor) {

        if (Object(object) !== object) {
            throw new TypeError('Object.defineProperty can only be called on Objects.');
        }

        if (Object(descriptor) !== descriptor) {
            throw new TypeError('Property description can only be an Object.');
        }

        if ('get' in descriptor || 'set' in descriptor) {
            throw new TypeError('getters & setters can not be defined on this javascript engine');
        }
        // If it's a data property.
        if ('value' in descriptor) {
            // fail silently if 'writable', 'enumerable', or 'configurable'
            // are requested but not supported
            // can't implement these features; allow true but not false
            /* if ( 
                     ('writable' in descriptor && !descriptor.writable) ||
                     ('enumerable' in descriptor && !descriptor.enumerable) ||
                     ('configurable' in descriptor && !descriptor.configurable)
                 )
                     {
                         throw new RangeError('This implementation of Object.defineProperty does not support configurable, enumerable, or writable properties SET to FALSE.');
                     }*/


            object[property] = descriptor.value;
        }
        return object;
    }
}
//getOwnPropertyDescriptor.js
if (!Object.getOwnPropertyDescriptor) {

    Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
        if (Object(object) !== object) {
            throw new TypeError('Object.getOwnPropertyDescriptor can only be called on Objects.');
        }

        var descriptor;
        if (!Object.prototype.hasOwnProperty.call(object, property)) {
            return descriptor;
        }

        descriptor = {
            enumerable: Object.prototype.propertyIsEnumerable.call(object, property),
            configurable: true
        };

        descriptor.value = object[property];

        var psPropertyType = object.reflect.find(property).type;
        descriptor.writable = !(psPropertyType === "readonly");

        return descriptor;
    }
}
//getOwnPropertyNames.js
if (!Object.getOwnPropertyNames) {
    Object.getOwnPropertyNames = function getOwnPropertyNames(object) {

        if (Object(object) !== object) {
            throw new TypeError('Object.getOwnPropertyNames can only be called on Objects.');
        }
        var names = [];
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
        for (var prop in object) {
            if (hasOwnProperty.call(object, prop)) {
                names.push(prop);
            }
        }
        var properties = object.reflect.properties;
        var methods = object.reflect.methods;
        var all = methods.concat(properties);
        for (var i = 0; i < all.length; i++) {
            var prop = all[i].name;
            if (hasOwnProperty.call(object, prop) && !(propertyIsEnumerable.call(object, prop))) {
                names.push(prop);
            }
        }
        return names;
    };
}
//getPrototypeOf.js
if (!Object.getPrototypeOf) {
	Object.getPrototypeOf = function(object) {
		if (Object(object) !== object) {
			throw new TypeError('Object.getPrototypeOf can only be called on Objects.');
		}
		return object.__proto__;
	}
}
//isExtensible.js
// ES5 15.2.3.13
// http://es5.github.com/#x15.2.3.13
if (!Object.isExtensible) {
    Object.isExtensible = function isExtensible(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.isExtensible can only be called on Objects.');
        }
        return true;
    };
}
//isFrozen.js
/*
https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
*/
// ES5 15.2.3.12
// http://es5.github.com/#x15.2.3.12
if (!Object.isFrozen) {
    Object.isFrozen = function isFrozen(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.isFrozen can only be called on Objects.');
        }
        return false;
    };
}
//isSealed.js
/*
https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
*/
// ES5 15.2.3.11
// http://es5.github.com/#x15.2.3.11
if (!Object.isSealed) {
    Object.isSealed = function isSealed(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.isSealed can only be called on Objects.');
        }
        return false;
    };
}
//keys.js
if (!Object.keys) {
    Object.keys = function(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.keys can only be called on Objects.');
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var result = [];
        for (var prop in object) {
            if (hasOwnProperty.call(object, prop)) {
                result.push(prop);
            }
        }
        return result;
    };
}
//preventExtensions.js
/*
https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
*/
// ES5 15.2.3.10
// http://es5.github.com/#x15.2.3.10
if (!Object.preventExtensions) {
    Object.preventExtensions = function preventExtensions(object) {

        if (Object(object) !== object) {
            throw new TypeError('Object.preventExtensions can only be called on Objects.');
        }
        // this is misleading and breaks feature-detection, but
        // allows "securable" code to "gracefully" degrade to working
        // but insecure code.
        return object;
    };
}
//seal.js
/*
https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
*/
// ES5 15.2.3.8
// http://es5.github.com/#x15.2.3.8
if (!Object.seal) {
    Object.seal = function seal(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.seal can only be called on Objects.');
        }
        // this is misleading and breaks feature-detection, but
        // allows "securable" code to "gracefully" degrade to working
        // but insecure code.
        return object;
    };
}
//freeze.js
/*
https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
*/
// ES5 15.2.3.9
// http://es5.github.com/#x15.2.3.9
if (!Object.freeze) {
    Object.freeze = function freeze(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.freeze can only be called on Objects.');
        }
        // this is misleading and breaks feature-detection, but
        // allows "securable" code to "gracefully" degrade to working
        // but insecure code.
        return object;
    };
}
//json2.js
//  json2.js
//  2017-06-12
//  Public Domain.
//  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

//  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
//  NOT CONTROL.

//  This file creates a global JSON object containing two methods: stringify
//  and parse. This file provides the ES5 JSON capability to ES3 systems.
//  If a project might run on IE8 or earlier, then this file should be included.
//  This file does nothing on ES5 systems.

//      JSON.stringify(value, replacer, space)
//          value       any JavaScript value, usually an object or array.
//          replacer    an optional parameter that determines how object
//                      values are stringified for objects. It can be a
//                      function or an array of strings.
//          space       an optional parameter that specifies the indentation
//                      of nested structures. If it is omitted, the text will
//                      be packed without extra whitespace. If it is a number,
//                      it will specify the number of spaces to indent at each
//                      level. If it is a string (such as "\t" or "&nbsp;"),
//                      it contains the characters used to indent at each level.
//          This method produces a JSON text from a JavaScript value.
//          When an object value is found, if the object contains a toJSON
//          method, its toJSON method will be called and the result will be
//          stringified. A toJSON method does not serialize: it returns the
//          value represented by the name/value pair that should be serialized,
//          or undefined if nothing should be serialized. The toJSON method
//          will be passed the key associated with the value, and this will be
//          bound to the value.

//          For example, this would serialize Dates as ISO strings.

//              Date.prototype.toJSON = function (key) {
//                  function f(n) {
//                      // Format integers to have at least two digits.
//                      return (n < 10)
//                          ? "0" + n
//                          : n;
//                  }
//                  return this.getUTCFullYear()   + "-" +
//                       f(this.getUTCMonth() + 1) + "-" +
//                       f(this.getUTCDate())      + "T" +
//                       f(this.getUTCHours())     + ":" +
//                       f(this.getUTCMinutes())   + ":" +
//                       f(this.getUTCSeconds())   + "Z";
//              };

//          You can provide an optional replacer method. It will be passed the
//          key and value of each member, with this bound to the containing
//          object. The value that is returned from your method will be
//          serialized. If your method returns undefined, then the member will
//          be excluded from the serialization.

//          If the replacer parameter is an array of strings, then it will be
//          used to select the members to be serialized. It filters the results
//          such that only members with keys listed in the replacer array are
//          stringified.

//          Values that do not have JSON representations, such as undefined or
//          functions, will not be serialized. Such values in objects will be
//          dropped; in arrays they will be replaced with null. You can use
//          a replacer function to replace those with JSON values.

//          JSON.stringify(undefined) returns undefined.

//          The optional space parameter produces a stringification of the
//          value that is filled with line breaks and indentation to make it
//          easier to read.

//          If the space parameter is a non-empty string, then that string will
//          be used for indentation. If the space parameter is a number, then
//          the indentation will be that many spaces.

//          Example:

//          text = JSON.stringify(["e", {pluribus: "unum"}]);
//          // text is '["e",{"pluribus":"unum"}]'

//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

//          text = JSON.stringify([new Date()], function (key, value) {
//              return this[key] instanceof Date
//                  ? "Date(" + this[key] + ")"
//                  : value;
//          });
//          // text is '["Date(---current time---)"]'

//      JSON.parse(text, reviver)
//          This method parses a JSON text to produce an object or array.
//          It can throw a SyntaxError exception.

//          The optional reviver parameter is a function that can filter and
//          transform the results. It receives each of the keys and values,
//          and its return value is used instead of the original value.
//          If it returns what it received, then the structure is not modified.
//          If it returns undefined then the member is deleted.

//          Example:

//          // Parse the text. Values that look like ISO date strings will
//          // be converted to Date objects.

//          myData = JSON.parse(text, function (key, value) {
//              var a;
//              if (typeof value === "string") {
//                  a =
//   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
//                  if (a) {
//                      return new Date(Date.UTC(
//                         +a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]
//                      ));
//                  }
//                  return value;
//              }
//          });

//          myData = JSON.parse(
//              "[\"Date(09/09/2001)\"]",
//              function (key, value) {
//                  var d;
//                  if (
//                      typeof value === "string"
//                      && value.slice(0, 5) === "Date("
//                      && value.slice(-1) === ")"
//                  ) {
//                      d = new Date(value.slice(5, -1));
//                      if (d) {
//                          return d;
//                      }
//                  }
//                  return value;
//              }
//          );

//  This is a reference implementation. You are free to copy, modify, or
//  redistribute.

/*jslint
    eval, for, this
*/

/*property
    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== "object") {
    JSON = {};
}

(function () {
    "use strict";

    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return (n < 10)
            ? "0" + n
            : n;
    }

    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== "function") {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? (
                    this.getUTCFullYear()
                    + "-"
                    + f(this.getUTCMonth() + 1)
                    + "-"
                    + f(this.getUTCDate())
                    + "T"
                    + f(this.getUTCHours())
                    + ":"
                    + f(this.getUTCMinutes())
                    + ":"
                    + f(this.getUTCSeconds())
                    + "Z"
                )
                : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap;
    var indent;
    var meta;
    var rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
            ? "\"" + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === "string"
                    ? c
                    : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + "\""
            : "\"" + string + "\"";
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i;          // The loop counter.
        var k;          // The member key.
        var v;          // The member value.
        var length;
        var mind = gap;
        var partial;
        var value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (
            value
            && typeof value === "object"
            && typeof value.toJSON === "function"
        ) {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case "string":
            return quote(value);

        case "number":

// JSON numbers must be finite. Encode non-finite numbers as null.

            return (isFinite(value))
                ? String(value)
                : "null";

        case "boolean":
        case "null":

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce "null". The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is "object", we might be dealing with an object or an array or
// null.

        case "object":

// Due to a specification blunder in ECMAScript, typeof null is "object",
// so watch out for that case.

            if (!value) {
                return "null";
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === "[object Array]") {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null";
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? "[]"
                    : gap
                        ? (
                            "[\n"
                            + gap
                            + partial.join(",\n" + gap)
                            + "\n"
                            + mind
                            + "]"
                        )
                        : "[" + partial.join(",") + "]";
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                (gap)
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                (gap)
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? "{}"
                : gap
                    ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                    : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== "function") {
        meta = {    // table of character substitutions
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"": "\\\"",
            "\\": "\\\\"
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = "";
            indent = "";

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === "string") {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== "function" && (
                typeof replacer !== "object"
                || typeof replacer.length !== "number"
            )) {
                throw new Error("JSON.stringify");
            }

// Make a fake root object containing our value under the key of "".
// Return the result of stringifying the value.

            return str("", {"": value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k;
                var v;
                var value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return (
                        "\\u"
                        + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                    );
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with "()" and "new"
// because they can cause invocation, and "=" because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
// replace all simple value tokens with "]" characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or "]" or
// "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

            if (
                rx_one.test(
                    text
                        .replace(rx_two, "@")
                        .replace(rx_three, "]")
                        .replace(rx_four, "")
                )
            ) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The "{" operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval("(" + text + ")");

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return (typeof reviver === "function")
                    ? walk({"": j}, "")
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError("JSON.parse");
        };
    }
}());




function __generateCloseButton() {
        // Extract the file name
    var scriptFileCloseButtonName = new File($.fileName).name;

    function closeButtonFncMain(windowObj) {
        dcSettings.saveIniSettings();
        logger.log("Pressed main close button, closing ScriptUI.", scriptFileCloseButtonName, LOG_LEVEL.INFO);
        windowObj.close();
    }

    function closeButtonFncSettings(windowObj) {
        
        logger.log("Pressed SettingsWindow close button.", scriptFileCloseButtonName, LOG_LEVEL.INFO);
        windowObj.close();
    }

    return {
        "closeButtonFncMain": closeButtonFncMain,
        "closeButtonFncSettings": closeButtonFncSettings,
    }
}

dcCloseButton = __generateCloseButton();


var deadlineCloudSettings = {};
var farmResult;
var queueResult;

function __generateSettingsWindow() {
    // Extract the file name
    var scriptFileSettingsWindowName = "SettingsWindow.jsx";

    var LABEL_SIZE_SETTINGS = [150, 20];
    var TEXT_SIZE_SETTINGS = [350, 18];
    var BTN_SIZE_SETTINGS = [100, 30];

    // UI copy of selected config data
    var configDataSelections = {}

    function initDeadlineCloudSettingsWindow() {
        dcProperties.isWindowClosed.set(true);
        initData();
        initSettings();
        initCallbacks();
        deadlineCloudSettings.settingsWindow.show();
    }

    function initData(){
        configDataSelections = {
            aws_profile: dcProperties.config.aws_profile.get(),
            job_history_dir: dcProperties.config.job_history_dir.get(),
            farm_id: dcProperties.config.farm_id.get(),
            queue_id: dcProperties.config.queue_id.get(),
            storage_profile_id: dcProperties.config.storage_profile_id.get(),
            job_attachments_file_system: dcProperties.config.job_attachments_file_system.get(),
            auto_accept: dcProperties.config.auto_accept.get(),
            conflict_resolution: dcProperties.config.conflict_resolution.get(),
            log_level: dcProperties.config.log_level.get(),
            deadline_cloud_monitor: dcProperties.config.deadline_cloud_monitor.get()
        }

        awsProfileList = dcProperties.profileList.get();
    }
    
    function initSettings() {
        /**
         * Open Settings window that enables Deadline Cloud Workstation Configuration
         */
        // Create main window
        deadlineCloudSettings.settingsWindow = new Window("window", "Deadline Cloud Workstation Configuration");


        // add color values to window graphics
        deadlineCloudSettings.winGraphics = deadlineCloudSettings.settingsWindow.graphics;
        red = deadlineCloudSettings.winGraphics.newPen(deadlineCloudSettings.winGraphics.BrushType.SOLID_COLOR, [1, 0, 0], 1);
        green = deadlineCloudSettings.winGraphics.newPen(deadlineCloudSettings.winGraphics.BrushType.SOLID_COLOR, [0, 1, 0], 1);
    
        // Create main panel
        deadlineCloudSettings.mainPanel = deadlineCloudSettings.settingsWindow.add("panel", undefined, "");
    
        // Create global settings panel
        globalSettingsPanel = deadlineCloudSettings.mainPanel.add("panel", undefined, "Global Settings");
        globalSettingsPanel.orientation = "column";
        globalSettingsPanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
    
        // Create label and dropdown menu group
        awsProfileGroup = globalSettingsPanel.add("group", undefined);
        awsProfileGroup.orientation = "row";
        awsProfileGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        awsProfileGroup.awsProfileLabel = awsProfileGroup.add("statictext", undefined, "AWS Profile");
        awsProfileGroup.awsProfileLabel.size = LABEL_SIZE_SETTINGS;
        awsProfileGroup.dropdownAwsProfile = awsProfileGroup.add("dropdownlist", undefined);
        awsProfileGroup.dropdownAwsProfile.size = TEXT_SIZE_SETTINGS;
        // Populate profileList
        for(var i =0; i < awsProfileList.length; i++)
        {
            awsProfileGroup.dropdownAwsProfile.add("item", awsProfileList[i]);
            if(awsProfileList[i] == configDataSelections.aws_profile)
            {
                awsProfileGroup.dropdownAwsProfile.selection = i;
            }
            logger.debug(awsProfileList[i], scriptFileSettingsWindowName);
        }
        // Create profile settings panel
        profileSettingsPanel = deadlineCloudSettings.mainPanel.add("panel", undefined, "Profile Settings");
        profileSettingsPanel.orientation = "column";
        profileSettingsPanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
    
        // Create Job history label, dir, file dialog button
        jobHistoryGroup = profileSettingsPanel.add("group", undefined);
        jobHistoryGroup.orientation = "row";
        jobHistoryGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        jobHistoryGroup.jobHistoryLabel = jobHistoryGroup.add("statictext", undefined, "Job History Dir");
        jobHistoryGroup.jobHistoryLabel.size = LABEL_SIZE_SETTINGS;
        jobHistoryGroup.jobHistoryText = jobHistoryGroup.add("edittext", undefined);
        jobHistoryGroup.jobHistoryText.size = TEXT_SIZE_SETTINGS;
        jobHistoryGroup.jobHistoryButton = jobHistoryGroup.add('button', undefined, "...");
        jobHistoryGroup.jobHistoryButton.size = [36,20];
    
        // Create default farm group and widgets
        farmGroup = profileSettingsPanel.add("group", undefined);
        farmGroup.orientation = "row";
        farmGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        farmGroup.farmLabel = farmGroup.add("statictext", undefined, "Default Farm");
        farmGroup.farmLabel.size = LABEL_SIZE_SETTINGS;
        farmGroup.defaultFarmDropdown = farmGroup.add("dropdownlist", undefined);
        farmGroup.defaultFarmDropdown.size = TEXT_SIZE_SETTINGS;
        farmGroup.defaultFarmDropdown.selection = 0;
        // Add refresh button to default queue
        farmGroup.farmRefreshButton = farmGroup.add("button", undefined, "Refresh");
        farmGroup.farmRefreshButton.size = [36,20];
    
        // Create farm settings panel
        farmSettingsPanel = deadlineCloudSettings.mainPanel.add("panel", undefined, "Farm Settings");
        farmSettingsPanel.orientation = "column";
        farmSettingsPanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];

        // Create Default Queue group and widgets
        defaultQueueGroup = farmSettingsPanel.add("group", undefined);
        defaultQueueGroup.orientation = "row";
        defaultQueueGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        defaultQueueGroup.defQLabel = defaultQueueGroup.add("statictext", undefined, "Default Queue");
        defaultQueueGroup.defQLabel.size = LABEL_SIZE_SETTINGS;
        defaultQueueGroup.defQDropdown = defaultQueueGroup.add("dropdownlist", undefined);
        defaultQueueGroup.defQDropdown.size = TEXT_SIZE_SETTINGS;
        defaultQueueGroup.defQDropdown.selection = 0;

        // Add refresh button to default queue
        defaultQueueGroup.defQRefreshButton = defaultQueueGroup.add("button", undefined, "Refresh");
        defaultQueueGroup.defQRefreshButton.size = [36,20];

        // Create Default Storage Profile group and widgets
        defaultStorageGroup = farmSettingsPanel.add("group", undefined);
        defaultStorageGroup.orientation = "row";
        defaultStorageGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        defaultStorageGroup.defStorageLabel = defaultStorageGroup.add("statictext", undefined, "Default Storage Profile");
        defaultStorageGroup.defStorageLabel.size = LABEL_SIZE_SETTINGS;
        defaultStorageGroup.defStorageDropdown = defaultStorageGroup.add("dropdownlist", undefined);
        defaultStorageGroup.defStorageDropdown.size = TEXT_SIZE_SETTINGS;
        defaultStorageGroup.defStorageDropdown.selection = 0;

        // Add refresh button to default queue
        defaultStorageGroup.defStorageRefreshButton = defaultStorageGroup.add("button", undefined, "Refresh");
        defaultStorageGroup.defStorageRefreshButton.size = [36,20];

        // FileSystem Options
        fileOptionsGroup = farmSettingsPanel.add("group", undefined);
        fileOptionsGroup.orientation = "row";
        fileOptionsGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        fileOptionsGroup.fileSystemOptions = fileOptionsGroup.add("statictext", undefined, "Job Attachments FileSystem Options");
        fileOptionsGroup.fileSystemOptions.size = LABEL_SIZE_SETTINGS;
        fileOptionsGroup.fileSystemOptions = fileOptionsGroup.add("dropdownlist", undefined, ["COPIED", "VIRTUAL"]);
        fileOptionsGroup.fileSystemOptions.size = TEXT_SIZE_SETTINGS;
        fileOptionsGroup.fileSystemOptions.selection = 0;

        // Create general settings panel
        generalSettingsPanel = deadlineCloudSettings.mainPanel.add("panel", undefined, "General Settings");
        generalSettingsPanel.orientation = "column";
        generalSettingsPanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
    
        // Create auto accept group and widgets
        autoAcceptGroup = generalSettingsPanel.add("group", undefined);
        autoAcceptGroup.orientation = "row";
        autoAcceptGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        autoAcceptGroup.aALabel = autoAcceptGroup.add("statictext", undefined, "Auto Accept Confirmation Prompts");
        autoAcceptGroup.aALabel.size = [170, 20];
        autoAcceptGroup.aACheckbox = autoAcceptGroup.add("checkbox", undefined, "");

        // FileSystem Options
        conflictResolutionGroup = generalSettingsPanel.add("group", undefined);
        conflictResolutionGroup.orientation = "row";
        conflictResolutionGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        conflictResolutionGroup.option = conflictResolutionGroup.add("statictext", undefined, "Conflict Resolution Option");
        conflictResolutionGroup.option.size = LABEL_SIZE_SETTINGS;
        conflictResolutionGroup.option = conflictResolutionGroup.add("dropdownlist", undefined, ["NOT_SELECTED", "SKIP", "OVERWRITE", "CREATE_COPY"]);
        conflictResolutionGroup.option.size = TEXT_SIZE_SETTINGS;
        conflictResolutionGroup.option.selection = 0;

        // Create logging level group and widgets
        loggingGroup = generalSettingsPanel.add("group", undefined);
        loggingGroup.orientation = "row";
        loggingGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        loggingGroup.loggingLabel = loggingGroup.add("statictext", undefined, " Current Logging Level");
        loggingGroup.loggingLabel.size = LABEL_SIZE_SETTINGS;
        loggingGroup.loggingDropdown = loggingGroup.add("dropdownlist", undefined, ["DEBUG", "INFO", "WARNING", "ERROR"]);
        loggingGroup.loggingDropdown.size = TEXT_SIZE_SETTINGS;
        loggingGroup.loggingDropdown.selection = 0;
    
        // Create authentication group and widgets
        authenticateGroup = deadlineCloudSettings.mainPanel.add("group", undefined);
        authenticateGroup.orientation = "row";
    
        authenticateGroup.credsLabel = authenticateGroup.add("statictext", undefined, "Source: ");
        authenticateGroup.credsLabel.size = [40, 20];
        authenticateGroup.credsAuthentication = authenticateGroup.add("statictext", undefined, "NOT_VALID");
        authenticateGroup.credsAuthentication.graphics.foregroundColor = red;
        authenticateGroup.credsAuthentication.size = [200, 20];

        authenticateGroup.statusLabel = authenticateGroup.add("statictext", undefined, "Status:");
        authenticateGroup.statusLabel.size = [40, 20];
        
        authenticateGroup.statusAuthentication = authenticateGroup.add("statictext", undefined, "NEEDS_LOGIN");
        authenticateGroup.statusAuthentication.graphics.foregroundColor = red;
        authenticateGroup.statusAuthentication.size = [140, 20];

        authenticateGroup.apiStatusLabel = authenticateGroup.add("statictext", undefined, "Deadline Cloud API: ");
        authenticateGroup.apiStatusLabel.size = [110, 20];

        authenticateGroup.apiAuthentication = authenticateGroup.add("statictext", undefined, "False");
        authenticateGroup.apiAuthentication.graphics.foregroundColor = red;
        authenticateGroup.apiAuthentication.size = [140, 20];

        // Create button group and widgets
        buttonsGroupSettingsWindow = deadlineCloudSettings.mainPanel.add("group", undefined);
        buttonsGroupSettingsWindow.orientation = "row";
        buttonsGroupSettingsWindow.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
    
        buttonsGroupSettingsWindow.loginBtn = buttonsGroupSettingsWindow.add("button", undefined, "Login");
        buttonsGroupSettingsWindow.loginBtn.size = BTN_SIZE_SETTINGS;
    
        buttonsGroupSettingsWindow.logoutBtn = buttonsGroupSettingsWindow.add("button", undefined, "Logout");
        buttonsGroupSettingsWindow.logoutBtn.size = BTN_SIZE_SETTINGS;
    
        buttonsGroupSettingsWindow.labelSpacer = buttonsGroupSettingsWindow.add("statictext", undefined, "");
        buttonsGroupSettingsWindow.labelSpacer.size = [150, 30];
    
        buttonsGroupSettingsWindow.okBtn = buttonsGroupSettingsWindow.add("button", undefined, "OK");
        buttonsGroupSettingsWindow.okBtn.size = BTN_SIZE_SETTINGS;
    
        buttonsGroupSettingsWindow.cancelBtn = buttonsGroupSettingsWindow.add("button", undefined, "Cancel");
        buttonsGroupSettingsWindow.cancelBtn.size = BTN_SIZE_SETTINGS;
    
        buttonsGroupSettingsWindow.applyBtn = buttonsGroupSettingsWindow.add("button", undefined, "Apply");
        buttonsGroupSettingsWindow.applyBtn.size = BTN_SIZE_SETTINGS;
    
        // Call connections
        initDeadlineCloudSettingsWindowConnections();
    }
    
    function initDeadlineCloudSettingsWindowConnections() {

        awsProfileGroup.dropdownAwsProfile.onChange = function()
        {
            var result = dcDeadlineCommands.logout(configDataSelections.aws_profile, configDataSelections.deadline_cloud_monitor);
            if(result.return_code == 0){
                dcProperties.isLoggedIn.set(false);
            } else{
                dcProperties.isLoggedIn.set(false);
            }
        }

        jobHistoryGroup.jobHistoryText.onChange = function()
        {
            logger.info("exportBundleDir changed to: " + configDataSelections.job_history_dir, scriptFileSettingsWindowName);
        }
        loggingGroup.loggingDropdown.onChange = function () {
            var selectedLogginglevel = loggingGroup.loggingDropdown.selection.text;
            var loggingIndex = LOG_LEVEL[selectedLogginglevel];
            CURRENT_LOG_LEVEL = loggingIndex;
            logger.info("Logging level changed to: " + selectedLogginglevel, scriptFileSettingsWindowName);
        }
    
        jobHistoryGroup.jobHistoryButton.onClick = function()
        {
            var outFolder = Folder.selectDialog();
            if (outFolder != null)
            {
                jobHistoryGroup.jobHistoryText.text = outFolder.fsName;
                exportBundleDir = outFolder.fsName;
                logger.info("exportBundleDir changed to: " + exportBundleDir, scriptFileSettingsWindowName);
            }
        }
        // Default Farm Refresh Button
        farmGroup.farmRefreshButton.onClick = function()
        {
            // Clear ListBox before we populate it again.
            farmGroup.defaultFarmDropdown.removeAll();
            dcInitData.initDeadlineFarmData();
            populateFarmData();
        }
        // Default Queue Refresh Button
        defaultQueueGroup.defQRefreshButton.onClick = function()
        {
            // Clear ListBox before we populate it again.
            defaultQueueGroup.defQDropdown.removeAll();
            var farmId = dcProperties.config.farm_id.get();
            var result = dcDeadlineCommands.listQueue(farmId);
            dcProperties.queueList.set(result);
            populateQueueListBox();
        }
        // Saving variables to ae_submission file should also happen on apply/ok!
        buttonsGroupSettingsWindow.loginBtn.onClick = function () {
            var result = dcDeadlineCommands.login(dcProperties.config.aws_profile.get(), dcProperties.config.deadline_cloud_monitor.get());
            if(result.return_code == 0){
                dcProperties.isLoggedIn.set(true);
            } else{
                dcProperties.isLoggedIn.set(false);
            }
        }
        buttonsGroupSettingsWindow.logoutBtn.onClick = function () {
            var result = dcDeadlineCommands.logout(dcProperties.config.aws_profile.get(), dcProperties.config.deadline_cloud_monitor.get());
            if(result.return_code == 0){
                dcProperties.isLoggedIn.set(false);
            } else{
                dcProperties.isLoggedIn.set(false);
            }
        }
        buttonsGroupSettingsWindow.cancelBtn.onClick = function () {
            logger.log("Closing Settings Window", scriptFileSettingsWindowName, LOG_LEVEL.INFO);
            dcCloseButton.closeButtonFncSettings(deadlineCloudSettings.settingsWindow);
            dcProperties.isAPIAvailable.remove_listener(onIsApiAvailableChanged);
            dcProperties.isLoggedIn.remove_listener(onIsLoggedInChanged);
            dcProperties.isWindowClosed.set(false);
        }
    
        buttonsGroupSettingsWindow.applyBtn.onClick = function () {
            applyConfigSettings();
        }

        buttonsGroupSettingsWindow.okBtn.onClick = function () {
            logger.log("Clicked OK button in Settings Window", scriptFileSettingsWindowName, LOG_LEVEL.INFO);
            applyConfigSettings();
            deadlineCloudSettings.settingsWindow.close();
            dcProperties.isAPIAvailable.remove_listener(onIsApiAvailableChanged);
            dcProperties.isLoggedIn.remove_listener(onIsLoggedInChanged);
            dcProperties.isWindowClosed.set(false);
        }

        // When selection for farm is changed -> Queue needs to be populated accordingly
        // First check if the farm is valid, if so proceed to fill.
        farmGroup.defaultFarmDropdown.onChange = function()
        {
            
            if (farmGroup.defaultFarmDropdown.selection)
            {
                logger.debug("farmGroup.defaultFarmDropdown.onChange: " + farmGroup.defaultFarmDropdown.selection.text, scriptFileSettingsWindowName);
                dcProperties.defaultFarm.set(farmGroup.defaultFarmDropdown.selection.text);
                // Clear ListBox before we populate it again.
                defaultQueueGroup.defQDropdown.removeAll();
                var farmId = dcProperties.config.farm_id.get();
                var result = dcDeadlineCommands.listQueue(farmId);
                dcProperties.queueList.set(result);
                populateQueueListBox();
            }
        }

        // Update Property when selection in listbox changes
        defaultQueueGroup.defQDropdown.onChange = function()
        {
            if(defaultQueueGroup.defQDropdown.selection)
            {
                if(defaultQueueGroup.defQDropdown.selection.text !== "<none selected>")
                {
                    dcProperties.defaultQueue.set(defaultQueueGroup.defQDropdown.selection.text);
                }
            }
        }
    }

    // ----- LISTENER CALLBACKS -----
    function initCallbacks(){
        dcProperties.isAPIAvailable.add_listener(onIsApiAvailableChanged);
        onIsApiAvailableChanged(dcProperties.isAPIAvailable.get());
        dcProperties.isLoggedIn.add_listener(onIsLoggedInChanged);
        onIsLoggedInChanged(dcProperties.isLoggedIn.get());
    }

    function onIsLoggedInChanged(newValue, oldValue){
        // Early exit if state is unchanged.
        if(newValue == oldValue){
            return;
        }

        // Logged in
        if(newValue){ 
            var _loginWindow = dcInitData.loadingLoginWindow();
            _loginWindow.text = "Logging in to Deadline Cloud Monitor."
            _loginWindow.children[0].text = "Logging in to Deadline Cloud Monitor."
            _loginWindow.update();
            logger.debug("[onIsLoggedInChanged] SETTINGS WINDOW LOGIN CALLBACK", scriptFileSettingsWindowName);
            // Set Button States
            farmGroup.farmRefreshButton.enabled = true;
            defaultQueueGroup.defQRefreshButton.enabled = true;
            defaultStorageGroup.defStorageRefreshButton.enabled = true;
            buttonsGroupSettingsWindow.applyBtn.enabled = true;
            buttonsGroupSettingsWindow.okBtn.enabled = true;

            authenticateGroup.credsAuthentication.text = dcProperties.credentialStatus.source.get();
            authenticateGroup.credsAuthentication.graphics.foregroundColor = green;
            if(dcProperties.credentialStatus.source.get() == "NOT_VALID")
            {
            authenticateGroup.credsAuthentication.graphics.foregroundColor = red;
            }

            authenticateGroup.statusAuthentication.text =  dcProperties.credentialStatus.status.get();
            authenticateGroup.statusAuthentication.graphics.foregroundColor = red;
            if(dcProperties.credentialStatus.status.get() == "AUTHENTICATED")
            {
                authenticateGroup.statusAuthentication.graphics.foregroundColor = green;
            }

            dcProperties.isAPIAvailable.set(dcProperties.credentialStatus.api.get());
            
            // logger.debug("[onIsLoggedInChanged] farmGroup.defaultFarmDropdown.removeAll()", scriptFileSettingsWindowName);
            farmGroup.defaultFarmDropdown.removeAll();
            // logger.debug("[onIsLoggedInChanged] defaultQueueGroup.defQDropdown.removeAll()", scriptFileSettingsWindowName);
            defaultQueueGroup.defQDropdown.removeAll();
            // logger.debug("[onIsLoggedInChanged] defaultStorageGroup.defStorageDropdown.removeAll()", scriptFileSettingsWindowName);
            defaultStorageGroup.defStorageDropdown.removeAll();
            // If already logged in through main window, fetch farm and queue data to fill relevant UI items.
            // logger.debug("[onIsLoggedInChanged] populateFarmData()", scriptFileSettingsWindowName);
            populateFarmData();
            if(farmGroup.defaultFarmDropdown.selection.text !== "<none selected>")
            {
                dcProperties.defaultFarm.set(farmGroup.defaultFarmDropdown.selection.text);
            }
            // logger.debug("[onIsLoggedInChanged] populateQueueListBox()", scriptFileSettingsWindowName);
            // populateFarmData triggers farmGroup.defaultFarmDropdown.onChange which populates the queue dropdown
            defaultQueueGroup.defQDropdown.removeAll();
            populateQueueListBox();
            dcProperties.defaultQueue.set(defaultQueueGroup.defQDropdown.selection.text);
            populateConfigData();
            // Update properties on startup of settings window
            jobHistoryGroup.jobHistoryText.text = configDataSelections.job_history_dir;
            _loginWindow.close();
            return;
        }
        
        // Logged out
        var _logoutWindow = dcInitData.loadingLoginWindow();
        _logoutWindow.text = "Logging out of Deadline Cloud Monitor."
        _logoutWindow.children[0].text = "Logging out of Deadline Cloud Monitor."
        _logoutWindow.update();
        logger.debug("SETTINGS WINDOW LOGOUT CALLBACK", scriptFileSettingsWindowName);
        // Set button states
        farmGroup.farmRefreshButton.enabled = false;
        defaultQueueGroup.defQRefreshButton.enabled = false;
        defaultStorageGroup.defStorageRefreshButton.enabled = false;
        buttonsGroupSettingsWindow.applyBtn.enabled = false;
        buttonsGroupSettingsWindow.okBtn.enabled = false;
        jobHistoryGroup.jobHistoryText.text = configDataSelections.job_history_dir;

        authenticateGroup.credsAuthentication.text = dcProperties.credentialStatus.source.get();
        authenticateGroup.credsAuthentication.graphics.foregroundColor = green;
        if(dcProperties.credentialStatus.source.get() == "NOT_VALID")
        {
            authenticateGroup.credsAuthentication.graphics.foregroundColor = red;
        }

        authenticateGroup.statusAuthentication.text =  dcProperties.credentialStatus.status.get();
        authenticateGroup.statusAuthentication.graphics.foregroundColor = red;
        if(dcProperties.credentialStatus.status.get() == "AUTHENTICATED")
        {
            authenticateGroup.statusAuthentication.graphics.foregroundColor = green;
        }
        dcProperties.isAPIAvailable.set(dcProperties.credentialStatus.api.get());


        farmGroup.defaultFarmDropdown.removeAll();
        defaultQueueGroup.defQDropdown.removeAll();
        defaultStorageGroup.defStorageDropdown.removeAll();

        // Add none selected as option
        farmGroup.defaultFarmDropdown.add("item", "<none selected>");
        farmGroup.defaultFarmDropdown.selection = 0;
        defaultQueueGroup.defQDropdown.add("item", "<none selected>");
        defaultQueueGroup.defQDropdown.selection = 0;
        defaultStorageGroup.defStorageDropdown.add("item", "<none selected>");
        defaultStorageGroup.defStorageDropdown.selection = 0;

        _logoutWindow.close();
    }

    function onIsApiAvailableChanged(newValue, oldValue)
    {
         // Early exit if state is unchanged.
        if(newValue == oldValue){
            return;
        }
        // Logged in
        if(newValue){
            authenticateGroup.apiAuthentication.text = 'True';
            authenticateGroup.apiAuthentication.graphics.foregroundColor = green;
            return;
        }
        // Logged out
        authenticateGroup.apiAuthentication.text = "False";
        authenticateGroup.apiAuthentication.graphics.foregroundColor = red;
    }
    // ----- /LISTENER CALLBACKS -----


    function populateFarmData(){
        farmResult = dcUtil.invertObject(dcProperties.farmList.get());
        var keys = Object.keys(farmResult);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            farmGroup.defaultFarmDropdown.add("item", key.replace(/[\x0A\x0D]/g, ''));
            farmResult[key] = farmResult[key].replace(/[\x0A\x0D]/g, '');
        }
        // Set selection in listbox
        farmGroup.defaultFarmDropdown.selection = 0;  // Default fallback
        for (var i = 0; i < keys.length; i++) {
            // Check if configDataSelections.farm_id is part of the larger string gotten from the parse(contains spaces and \n).
            var key = keys[i];
            if(configDataSelections.farm_id.indexOf(farmResult[key]) !== -1)
            {
                // default farm id has been found in the object -> set as default queue selection in listbox
                farmGroup.defaultFarmDropdown.selection = i;
                logger.debug("Default farm-id has been found in object: " + farmResult[key], scriptFileSettingsWindowName);
                break;
            }
        }
    }
    
    function populateQueueListBox()
    {
        // Clear out array to not add extra items to the list.
        queueResult = dcUtil.invertObject(dcProperties.queueList.get());
        var keys = Object.keys(queueResult)
        // Fill the queue listbox with possible item found with systemCall
        for (var i = 0; i < keys.length; i ++)
        {
            var key = keys[i];
            defaultQueueGroup.defQDropdown.add("item", key);
            // remove r\n from the string
            queueResult[key] = queueResult[key].replace(/[\x0A\x0D]/g, '');
            logger.debug("Filling listbox with item: " + key, scriptFileSettingsWindowName);
            if(configDataSelections.queue_id.indexOf(queueResult[key]) !== -1)
            {
                // If queue and default queue are the same, set the queue as the selected item in the listbox.
                defaultQueueGroup.defQDropdown.selection = i;
            }
            if(configDataSelections.queue_id.length === 0)
            {
                defaultQueueGroup.defQDropdown.selection = 0;
                alert("No default queue found in console, setting selection to first object in listbox.");
                logger.debug("No default queue found in console, setting selection to first object in listbox.", scriptFileSettingsWindowName);
            }
        }
    }

    function populateConfigData()
    {
        // Clear all the listboxes first, otherwise we might get duplication
        defaultStorageGroup.defStorageDropdown.removeAll();

        // Profile
        jobHistoryGroup.jobHistoryText.text = configDataSelections.job_history_dir;
        defaultStorageGroup.defStorageDropdown.add("item", configDataSelections.storage_profile_id);
        defaultStorageGroup.defStorageDropdown.selection = 0;
        autoAcceptGroup.aACheckbox.value = dcUtil.parseBool(configDataSelections.auto_accept);

        // Set Default Storage selection
        //dcUtil.setListBoxSelection(defaultStorageGroup.defStorageDropdown, configDataSelections.storage_profile_id);

        // Set file system options selection
        dcUtil.setListBoxSelection(fileOptionsGroup.fileSystemOptions, configDataSelections.job_attachments_file_system);

        // Conflict Resolution Options selection
        dcUtil.setListBoxSelection(conflictResolutionGroup.option, configDataSelections.conflict_resolution);

        // Set logging group selection
        dcUtil.setListBoxSelection(loggingGroup.loggingDropdown, configDataSelections.log_level);
    }

    function getItemID(itemName, dataObject)
    {
        // Get the farm-id of the current selected item in the default farm listbox.
        var items = Object.keys(dataObject);
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if(itemName.indexOf(item) !== -1)
            {
                var id = dataObject[item];
                id = dcUtil.removeLineBreak(id);
                break;
            }
        }
        return id;
    }

    function applyConfigSettings()
    {
        logger.log("Applying chosen settings in Settings Window", scriptFileSettingsWindowName, LOG_LEVEL.INFO);

        var combinedCommand = "";

        if(configDataSelections.job_history_dir !== jobHistoryGroup.jobHistoryText.text)
        {
            var newHistoryDir = jobHistoryGroup.jobHistoryText.text
            if (newHistoryDir.indexOf('~') === 0){  // Contains a leading ~
                newHistoryDir = dcUtil.getUserDirectory() + newHistoryDir.substring(1)
            }
            newHistoryDir = dcUtil.enforceForwardSlashes(newHistoryDir)
            combinedCommand += "deadline config set settings.job_history_dir \"" + newHistoryDir + "\"";
            configDataSelections.job_history_dir = newHistoryDir;
            dcProperties.config.job_history_dir.set(configDataSelections.job_history_dir);
            logger.debug("Changed job_history_dir to: " + newHistoryDir, scriptFileSettingsWindowName);
        }

        if(configDataSelections.farm_id !== getItemID(farmGroup.defaultFarmDropdown.selection.text, farmResult))
        {
            combinedCommand += " && deadline config set defaults.farm_id " + getItemID(farmGroup.defaultFarmDropdown.selection.text, farmResult);
            configDataSelections.farm_id = getItemID(farmGroup.defaultFarmDropdown.selection.text, farmResult);
            dcProperties.config.farm_id.set(configDataSelections.farm_id);
            logger.debug("Changed farm_id to: "+ configDataSelections.farm_id, scriptFileSettingsWindowName);
        }
        
        if(configDataSelections.queue_id !== getItemID(defaultQueueGroup.defQDropdown.selection.text, queueResult))
        {
            combinedCommand += " && deadline config set defaults.queue_id " + getItemID(defaultQueueGroup.defQDropdown.selection.text, queueResult);
            configDataSelections.queue_id = getItemID(defaultQueueGroup.defQDropdown.selection.text, queueResult);
            dcProperties.config.queue_id.set(configDataSelections.queue_id);
            logger.debug("Changed queue_id to: "+ configDataSelections.queue_id, scriptFileSettingsWindowName);
        }


        if(configDataSelections.job_attachments_file_system !== fileOptionsGroup.fileSystemOptions.selection.text)
        {
            combinedCommand += " && deadline config set defaults.job_attachments_file_system " + fileOptionsGroup.fileSystemOptions.selection.text;
            configDataSelections.job_attachments_file_system = fileOptionsGroup.fileSystemOptions.selection.text;
            dcProperties.config.job_attachments_file_system.set(configDataSelections.job_attachments_file_system);
            logger.debug("Changed job_attachments_file_system to: "+ configDataSelections.job_attachments_file_system, scriptFileSettingsWindowName);
        }

        if(configDataSelections.auto_accept !== autoAcceptGroup.aACheckbox.value)
        {
            if(autoAcceptGroup.aACheckbox.value == true)
            {
                combinedCommand += " && deadline config set settings.auto_accept True";
                configDataSelections.auto_accept = "True";
                dcProperties.config.auto_accept.set(configDataSelections.auto_accept);
            }
            else{
                combinedCommand += " && deadline config set settings.auto_accept False";
                configDataSelections.auto_accept = "False";
                dcProperties.config.auto_accept.set(configDataSelections.auto_accept);
            }
            logger.debug("Changed auto_accept to: "+ configDataSelections.auto_accept, scriptFileSettingsWindowName);
        }

        if(configDataSelections.conflict_resolution !== conflictResolutionGroup.option.selection.text)
        {
            combinedCommand += " && deadline config set settings.conflict_resolution " + conflictResolutionGroup.option.selection.text;
            configDataSelections.conflict_resolution = conflictResolutionGroup.option.selection.text;
            dcProperties.config.conflict_resolution.set(configDataSelections.conflict_resolution);
            logger.debug("Changed conflict_resolution to: "+ configDataSelections.conflict_resolution, scriptFileSettingsWindowName);
        }

        if(configDataSelections.log_level !== loggingGroup.loggingDropdown.selection.text)
        {
            combinedCommand += " && deadline config set settings.log_level " + loggingGroup.loggingDropdown.selection.text;
            configDataSelections.log_level = loggingGroup.loggingDropdown.selection.text;
            dcProperties.config.log_level.set(configDataSelections.log_level);
            logger.debug("Changed log_level to: "+ configDataSelections.log_level, scriptFileSettingsWindowName);
        }
        // If some values are the same, the command will have '&& ' at the start
        if(combinedCommand.indexOf(" && ") === 0)
        {
            combinedCommand = combinedCommand.slice(4);
        }
        var setNewDefaults = dcUtil.wrappedCallSystem(combinedCommand);
        logger.debug(setNewDefaults, scriptFileSettingsWindowName);
    }

    return {
        "initDeadlineCloudSettingsWindow": initDeadlineCloudSettingsWindow
    }
}

dcSettingsWindow = __generateSettingsWindow();


function __generateSubmitButton() {
    // Extract the file name
    var _submitButtonFileName = "SubmitButton.jsx";
    function submitRenderQueueToDeadlineCloud(renderQueueItem, itemName) {
        /**
         * Submit the entire renderQueue to deadline based on a job template and job parameters.
         */

        var templates = createDataAndParameterTemplateSeparateJobs(renderQueueItem, itemName);
        jobAssetReferences = generateAssetReferences();
        var _submissionResult = createSubmission(templates.jobTemplate, templates.jobParams, jobAssetReferences, dcProperties.config.job_history_dir.get(), jobGroup.jobName.text);
        return _submissionResult;
    }

    function generatePartialTemplate()
    {
        // 1. Copy template, modify attributes as needed
        jobTemplate = JSON.parse(JSON.stringify(OPENJD_TEMPLATE));

        jobTemplate.name = dcUtil.removePercentageFromFileName(jobGroup.jobName.text);

        // Only add description when there is one provided
        if(dcProperties.deadlineJobParameters.description.get().length !== 0)
        {
            jobTemplate.description = dcProperties.deadlineJobParameters.description.get();
        }

        paramDefCopy = jobTemplate.parameterDefinitions;
        jobTemplate.parameterDefinitions = [];
        // Only use the AfterEffectsProjectFile parameter from the template, remove the others.
        for(var i = paramDefCopy.length - 1; i >= 0; i--)
        {
            if(paramDefCopy[i].name == "AfterEffectsProjectFile")
            {
                jobTemplate.parameterDefinitions.push(paramDefCopy[i]);
            }
        }

        return jobTemplate;
    }

    function generateAssetReferences()
    {
        // 3. Create asset reference dict
        jobAssetReferences = JSON.parse(JSON.stringify(OPENJD_ASSET_REFERENCE));

        // Get asset references from Job Attachment Panel
        // --------- Attach input files
        if(dcProperties.jobAttachments.autoDetectedInputFiles.get().length < dcProperties.jobAttachments.userAddedInputFiles.get().length + dcProperties.jobAttachments.autoDetectedInputFiles.get().length)
        {   
            // Add auto detected footage and added footage together to send as asset files for the template
            var assetFiles = dcProperties.jobAttachments.userAddedInputFiles.get().concat(dcProperties.jobAttachments.autoDetectedInputFiles.get());
            jobAssetReferences.assetReferences.inputs.filenames = assetFiles;
        }
        else{
            var assetFiles = dcProperties.jobAttachments.autoDetectedInputFiles.get();
            jobAssetReferences.assetReferences.inputs.filenames = assetFiles;
        }

        // ---------- Input Directories
        var inputDirectories = dcProperties.jobAttachments.userAddedInputDirectories.get();
        jobAssetReferences.assetReferences.inputs.directories = inputDirectories;

        // ---------- Output Directories
        if(dcProperties.jobAttachments.autoDetectOutputDirectories.get().length < dcProperties.jobAttachments.userAddedOutputDirectories.get().length + dcProperties.jobAttachments.autoDetectOutputDirectories.get().length)
        {
            var outputDirectories = dcProperties.jobAttachments.userAddedOutputDirectories.get().concat(dcProperties.jobAttachments.autoDetectOutputDirectories.get());
            jobAssetReferences.assetReferences.outputs.directories = outputDirectories;
        }
        else{
            var outputDirectories = dcProperties.jobAttachments.autoDetectOutputDirectories.get();
            jobAssetReferences.assetReferences.outputs.directories = outputDirectories;
        }

        return jobAssetReferences;
    }


    function generateStep(basicTemplate, itemName, stepsTemplate, stepID, renderQueueItem)
    {
        var compNameToCheck = dcUtil.removeIllegalCharacters(renderQueueItem.comp.name);
        // logger.debug("[generateStep] itemName: " + itemName + "  stepID: " + stepID + "  compNameToCheck: " + compNameToCheck, _submitButtonFileName);
        stepsTemplate[0].name = itemName;
        stepsTemplate[0].parameterSpace.taskParameterDefinitions[0].range = "{{Param." + itemName + "_Frames}}";
        stepsTemplate[0].script.embeddedFiles[0].data = "frame: {{Task.Param.Frame}}";
        if(itemName != compNameToCheck)
        {
            stepsTemplate[0].stepEnvironments[0].script.embeddedFiles[0].data += "comp_name: {{Param." + compNameToCheck + "_CompName}} \n";
        }
        else
        {
            stepsTemplate[0].stepEnvironments[0].script.embeddedFiles[0].data += "comp_name: {{Param." + itemName + "_CompName}} \n";
        }
        stepsTemplate[0].stepEnvironments[0].script.embeddedFiles[0].data += "output_file_path: {{Param." + itemName + "_OutputFilePath}} \n";
        stepsTemplate[0].stepEnvironments[0].script.embeddedFiles[0].data += "output_pattern: {{Param." + itemName + "_OutputPattern}} \n";
        stepsTemplate[0].stepEnvironments[0].script.embeddedFiles[0].data += "output_format: {{Param." + itemName + "_OutputFormat}} \n";
        basicTemplate.steps[stepID-1] = stepsTemplate[0]; 
        // logger.debug("[generateStep] basicTemplate: " + JSON.stringify(basicTemplate), _submitButtonFileName);
        return basicTemplate;
    }

    function applyDataToTemplate(dataName, dataTemplate)
    {
        if(dataName.indexOf("Frames") >= 0 || dataName.indexOf("OutputFilePath") >= 0)
        {
            dataTemplate.userInterface.groupLabel = dataName + " Settings";
        }
        dataTemplate.name = dataName;
        return dataTemplate;
    }

    function applyDataToParameterTemplate(dataName, dataValue)
    {
        var parameterDataTemplate = 
        {
            "name": dataName,
            "value": dataValue
        }
        return parameterDataTemplate;
    }

    function applyHostReqToTemplate(jobTemplate)
    {
        // Add host requirements to each step
        if(runGroup.runRequirementHostCheckBox.value)
        {
            var reqs = dcUtil.collectHostRequirements();
            for(var i = 0; i < jobTemplate.steps.length; i++)
            {
                jobTemplate.steps[i].hostRequirements = reqs;
            }
        }
        return jobTemplate
    }
    function getStartFrame(renderQueueItem) {
        /**
         * Get Startframe from the renderQueueItem
         */
        //get the frame offset & duration
        var frameOffset = app.project.displayStartFrame;
        var frameDuration = renderQueueItem.comp.frameDuration;
        var startFrame = 0;
        if (frameListGroup.useCompFrameList.value == true) {
            startFrame = frameOffset + Math.round(renderQueueItem.comp.workAreaStart / frameDuration);
            return startFrame;
        }

        startFrame = frameListGroup.frameList.text.split("-")[0];
        logger.debug("Start frame set to: " + startFrame, _submitButtonFileName);
        return startFrame;
    }

    function getEndFrame(renderQueueItem) {
        /**
         * Get EndFrame from the renderQueueItem
         */
        var frameOffset = app.project.displayStartFrame;
        var frameDuration = renderQueueItem.comp.frameDuration;
        var endFrame = 0;
        if (frameListGroup.useCompFrameList.value == true) {
            var currStartFrame = frameOffset + Math.round(renderQueueItem.comp.workAreaStart / frameDuration);
            endFrame = currStartFrame + Math.round(renderQueueItem.comp.workAreaDuration / frameDuration) - 1;
            return endFrame;
        }

        endFrame = frameListGroup.frameList.text.split("-")[1];
        logger.debug("End frame set to: " + endFrame, _submitButtonFileName);
        return endFrame;
    }

    function getFrameList(renderQueueItem)
    {
        var frameList = "";
        // Get correct frameList based on UI 
        if(frameListGroup.useCompFrameList.value)
        {
            frameList = getStartFrame(renderQueueItem) + "-" + getEndFrame(renderQueueItem);
        }
        else
        {
            frameList = frameListGroup.frameList.text;
            frameList = frameList;
        }
        return frameList;
    }

    function getCompName(renderQueueItem) {

        var compName = renderQueueItem.comp.name;
        var regexCompName = new RegExp('\\b' + "%20" + '\\b', 'g');
        compName = compName.replace(regexCompName, " ");
        logger.debug("Comp name set to: " + compName, _submitButtonFileName);
        return compName;
    }

    function getRenderQueueItemData(renderQueueItem) {
        /**
         * Get fileName and extension for the a renderQueueItem
         */
        var path = getOutputDirectory(renderQueueItem);
        // Split the file path to extract the file name and extension
        // Create lastIndex and regex to remove unwanted parts in the name. 
        var lastIndex = path.name.lastIndexOf(".");
        var regex = new RegExp('\\b' + "%5B#####%5D" + '\\b', 'g');
        var outputFileNameWithExtension = path.name.replace(regex, "[####]");
        var outputFileNameNoRegex = path.name.substring(0, lastIndex);
        var outputFileName = outputFileNameNoRegex.replace(regex, "[####]");
        var extension = outputFileNameWithExtension.substring(outputFileNameWithExtension.lastIndexOf('.') + 1);
        logger.debug("Output File Name set to: " + outputFileName, _submitButtonFileName);
        logger.debug("Extension set to: " + extension, _submitButtonFileName);

        return {
            fileName: outputFileName,
            extension: extension
        };
    }

    function getCompleteDirectory(renderQueueItem) {
        var fullPath = getOutputDirectory(renderQueueItem).parent.fsName;
        return fullPath;
    }

    function getOutputDirectory(renderQueueItem) {
        /**
         * Get the output directory for the renderQueueItem
         */

        var outputModule = renderQueueItem.outputModule(1); // Assuming you want the first output module
        // Get the file path from the output module
        var filePath = outputModule.file;
        logger.debug("Output Dir set to: " + filePath.parent.fsName, _submitButtonFileName);
        return filePath;
    }

    function handleSubmitButtonPressed() {
        /**
         * Gives warning popups if settings are wrong, comps not selected, no items in render queue, etc.
         */
        // Reset progressbar (In case submit button was pressed multiple times)
        progressBarPanel.progressBar.value = 0;
        
        // Alerts with numbers are placeholders to test functionality of the submit button.
        var queuedCount = dcAeUtil.getQueuedCompCount();
        if (queuedCount != 0) {
            results = "";
            errors = "";
            warnings = "";
            // Check for duplicate items in render queue
            if (dcAeUtil.containsDuplicateComps())
                errors += "\nAt least 2 of your items in the Render Queue have the same name. Please ensure that all of your items have unique names.\n";

            // Check no comp names contain whitespace at start or end of comp name.
            var compNames = dcAeUtil.checkForWhiteSpaceCompName();
            if (compNames.length > 0)
                errors += "\nThe following comp names contain starting/trailing whitespace characters. Ensure whitespace is removed prior to job submission:\n\n" + compNames.join() + "\n";
            // Check no comp names contain any illegal file path characters.
            var compNames = dcAeUtil.checkForIllegalCharCompName();
            if (compNames.length > 0)
                errors += "\nThe following comp names contain illegal characters in their name. Ensure any invalid file path characters are removed prior to job submission:\n\n" + compNames.join() + "\n";

            // Check frame range
            if (!frameListGroup.useCompFrameList.value && frameListGroup.frameList.text == "")
                errors += "\nPlease specify a frame list, or enable the option to use the frame list from the comp.\n";
            var __frameList = frameListGroup.frameList.text;
            __frameList = dcUtil.getDuplicateFrames(__frameList);
            if(__frameList.length != 0)
            {
                errors += "\nPlease give a correct frame list. Current frame list has duplicate frames and/or is wrong.\n";
            }

            // Cycle through all the comps in the Render Queue and check the queued ones
            var submissionText = compSubmissionGroup.compSubmission.selection.toString();

            if (submissionText == useQueue || submissionText != selectOne) {
                for (i = 1; i <= app.project.renderQueue.numItems; ++i) {
                    if (submissionText == useQueue && app.project.renderQueue.item(i).status != RQItemStatus.QUEUED) {
                        // Don't display warnings about unqueued items
                        continue;
                    }
                    warnings += dcAeUtil.checkCompOutputs(i);
                }
            } else if (compSelectionGroup.compSelection.selection == null) {
                errors += "\nNo Comp is selected.\n";
            } else {
                // Render queue items are 1-indexed
                var compSelectionItemIndex = compSelectionGroup.compSelection.selection.index + 1;
                warnings += dcAeUtil.checkCompOutputs(compSelectionItemIndex);
            }
            if (errors != "") {
                errors += "\n\nPlease fix these errors before submitting your job to Deadline.";
                alert(errors);
                return;
            } 

            var restoreProjectPath = false;
            var deleteTempXmlFile = false;
            var oldProjectPath = projectPath;
            var oldGPUAccelType = dcUtil.checkGPUAccelType(submitEntireQueueGroup.submitScene.value, ignoreGPUAccelGroup.ignoreGPUAccelWarning.value);

            // See if we need to save the current scene as an aepx file first.
            if (ignoreMissingLayersGroup.value && projectPath.indexOf(".aep", projectPath.length - 4) != -1) {
                app.project.save(File(projectPath.substring(0, projectPath.length - 4) + ".aepx"));
                projectPath = app.project.file.fsName;
                restoreProjectPath = true;
                if (ignoreMissingEffectsGroup.deleteTempXml.value && submitEntireQueueGroup.submitScene.value) {
                    deleteTempXmlFile = true;
                }
            } else {
                // Save the project before submission
                app.project.save(app.project.file);
            }

            var jobCount = 0;
            var totalJobs = queuedCount;

            if (submissionText == useQueue)
                totalJobs = 1;

            progressBarPanel.progressBar.value = 0;
            
            // If we're selecting a comp to render, check if it's not queued for render
            if ((submissionText == selectOne) && (app.project.renderQueue.item(compSelectionItemIndex).status != RQItemStatus.QUEUED)) {
                // Alert user that comp is not queued for render and stop submit process
                var comp_queue_error = "The selected comp is not queued for render: " + app.project.renderQueue.item(compSelectionItemIndex).comp.name + "\n";
                comp_queue_error += "Please enable rendering for that item in the Render Queue.";
                alert(comp_queue_error);
                return;
            }
            
            var numSucceeded = 0;
            var isValidToRenderSubmission = false;
            if (submissionText == allQueueSep) {
                // Cycle through all the comps in the Render Queue and submit the queued ones
                for (i = 1; i <= app.project.renderQueue.numItems; ++i) {
                    if (app.project.renderQueue.item(i).status != RQItemStatus.QUEUED) {
                        // Only submit comps that are queued
                        continue;
                    }
                    // Check if skip existing files option has been enabled, if not enabled it. If pressed cancel, we cancel the submission
                    if (!dcUtil.validateSkipExistingFrames(app.project.renderQueue.item(i), app.project.renderQueue.item(i).getSettings(), isValidToRenderSubmission)) {
                        progressBarPanel.progressBar.value = 0;
                        app.project.save(app.project.file);
                        logger.info("Pressed cancel, aborting entire submission process.", _submitButtonFileName);
                        continue;
                    }
                    // Only show prompt to upload files once.
                    if(i == 1 && dcProperties.config.auto_accept.get() == "False" && !dcUtil.validateAutoAccept())
                    {
                        progressBarPanel.progressBar.value = 0;
                        app.project.save(app.project.file);
                        logger.info("Pressed cancel upload job attachments, aborting entire submission process.", _submitButtonFileName);
                        break;
                    }
                    // Submit the current item
                    var submitCompResult = submitRenderQueueToDeadlineCloud(app.project.renderQueue.item(i), dcUtil.removeIllegalCharacters(app.project.renderQueue.item(i).comp.name));
                    results = submitCompResult;
                    jobCount = jobCount + 1;
                    progressBarPanel.progressBar.value = (jobCount * 100) / (totalJobs + 1);

                    if(submitCompResult) {
                        numSucceeded++;
                    } else {
                        logger.info("Submission for " + app.project.renderQueue.item(i).comp.name + " has failed.", _submitButtonFileName);
                        alert("Failed to submit job for " + app.project.renderQueue.item(i).comp.name + ".");
                        continue;
                    }
                    
                    logger.info("Submit Entire Render Queue to Deadline Cloud.")
                    if (submissionText == useQueue)
                        break;
                }

            } else if (submissionText == selectOne) {
                // Check if skip existing files option has been enabled, if not enabled it. If pressed cancel, we cancel the submission
                if (!dcUtil.validateSkipExistingFrames(app.project.renderQueue.item(compSelectionItemIndex), app.project.renderQueue.item(compSelectionItemIndex).getSettings(), isValidToRenderSubmission)) {
                    progressBarPanel.progressBar.value = 0;
                    app.project.save(app.project.file);
                    logger.info("Pressed cancel, aborting entire submission process.", _submitButtonFileName);
                }
                else if(dcProperties.config.auto_accept.get() == "False" && !dcUtil.validateAutoAccept())
                {
                    progressBarPanel.progressBar.value = 0;
                    app.project.save(app.project.file);
                    logger.info("Pressed cancel upload job attachments, aborting entire submission process.", _submitButtonFileName);
                }
                else{
                    var submitSelectedCompResult = submitRenderQueueToDeadlineCloud(app.project.renderQueue.item(compSelectionItemIndex), dcUtil.removeIllegalCharacters(compSelectionGroup.compSelection.selection.text));
                    results = submitSelectedCompResult;
                    if(submitSelectedCompResult) {
                        numSucceeded++;
                    } else {
                        logger.info("Submission for " + compSelectionGroup.compSelection.selection.text + " has failed.", _submitButtonFileName);
                    }
                    logger.info("Submit Selected Comp to Deadline Cloud", _submitButtonFileName);
                }
            }
            else {
                // Submit the entire render queue as one job
                logger.info("Submit the entire render queue as one job", _submitButtonFileName);
                var templates = createDataAndParameterTemplateOneJob();
                // logger.debug("templates: " + JSON.stringify(templates), _submitButtonFileName);
                jobAssetReferences = generateAssetReferences();
                // logger.debug("jobAssetReferences: " + JSON.stringify(jobAssetReferences), _submitButtonFileName);
                var _submissionResult = createSubmission(templates.jobTemplate, templates.jobParams, jobAssetReferences, dcProperties.config.job_history_dir.get(), jobGroup.jobName.text);
                // logger.debug("_submissionResult: " + JSON.stringify(_submissionResult), _submitButtonFileName);
                results = _submissionResult;
                if (results) {
                    numSucceeded++;
                }
            }

            progressBarPanel.progressBar.value = 100;
            // Restore the original project path if necessary.
            if (restoreProjectPath) {
                //Delete temp aepx project file if generated by Deadline job submission prior to restoring project path.
                if (deleteTempXmlFile) {
                    var tempXmlFile = File(projectPath);
                    tempXmlFile.remove();
                }
                app.open(File(oldProjectPath));
                projectName = app.project.file.name; //reset to current projectName for subsequent job submissions.
                projectPath = app.project.file.fsName; //reset to current projectPath for subsequent job submissions.
            } else if (oldGPUAccelType != null) {
                app.project.gpuAccelType = oldGPUAccelType;
            }
            if (!results && submissionText == selectOne) {
                alert("Failed to submit job for " + compSelectionGroup.compSelection.selection.text + ".")
            }
            else if (!results && submissionText == useQueue)
            {
                alert("Failed to submit the render queue.\n");
            }
            else if (results && (submissionText == selectOne) || ((queuedCount == 1) && (submissionText == useQueue || submissionText == allQueueSep))) {
                alert("Completed submission.\n" + "1 job was submitted successfully.");
            }
            else {
                alert("Completed submission.\n" + numSucceeded + " of " + queuedCount + " jobs were submitted successfully.");
            }
        } else {
            alert("The render queue is currently empty, or you do not have any items enabled for rendering in the render queue, or you did not provide an output location for the renderQueueItem.");
        }
    }

    function createDataAndParameterTemplateOneJob()
    {
        jobTemplate = generatePartialTemplate();
        stepsTemplate = jobTemplate.steps;
        jobTemplate.steps = [];

        // Add parameter data that only has to be added once
        jobParams = {};
        jobParams.parameterValues = [];
        jobParams.parameterValues.push(applyDataToParameterTemplate("AfterEffectsProjectFile", app.project.file.fsName));
        jobParams.parameterValues.push(applyDataToParameterTemplate("deadline:targetTaskRunStatus", dcProperties.deadlineJobParameters.targetTaskRunStatus.get()));
        jobParams.parameterValues.push(applyDataToParameterTemplate("deadline:maxFailedTasksCount", dcProperties.deadlineJobParameters.maxFailedTasksCount.get()));
        jobParams.parameterValues.push(applyDataToParameterTemplate("deadline:maxRetriesPerTask", dcProperties.deadlineJobParameters.maxRetriesPerTask.get()));
        jobParams.parameterValues.push(applyDataToParameterTemplate("deadline:priority", dcProperties.deadlineJobParameters.priority.get()));
        
        // As we may skip some items, stepIndex is the number of renderQueue items successfully processed.
        var stepIndex = 1;
        for (var j = 1; j <= app.project.renderQueue.numItems; j++) {
            // logger.debug("[createDataAndParameterTemplateOneJob] j: " + j, _submitButtonFileName);
            if (app.project.renderQueue.item(j).status != RQItemStatus.QUEUED) {
                // Only submit comps that are queued
                continue;
            }
            
            var __compName = dcUtil.removeIllegalCharacters(app.project.renderQueue.item(j).comp.name);
            var frameList = getFrameList(app.project.renderQueue.item(j));
            
            // logger.debug("[createDataAndParameterTemplateOneJob] __compName: " + __compName, _submitButtonFileName);
            // logger.debug("[createDataAndParameterTemplateOneJob] frameList: " + frameList, _submitButtonFileName);
            
            // Add data to the main template
            jobTemplate.parameterDefinitions.push(applyDataToTemplate(__compName + "_Frames", dcUtil.deepCopy(dcDataTemplate.Frames)));
            jobTemplate.parameterDefinitions.push(applyDataToTemplate(__compName + "_OutputPattern", dcUtil.deepCopy(dcDataTemplate.OutputPattern)));
            jobTemplate.parameterDefinitions.push(applyDataToTemplate(__compName + "_OutputFormat", dcUtil.deepCopy(dcDataTemplate.OutputFormat)));
            jobTemplate.parameterDefinitions.push(applyDataToTemplate(__compName + "_CompName", dcUtil.deepCopy(dcDataTemplate.CompName)));
            jobTemplate.parameterDefinitions.push(applyDataToTemplate(__compName + "_OutputFilePath", dcUtil.deepCopy(dcDataTemplate.OutputFilePath)));
            
            // Add steps data per task that needs to be run
            jobTemplate = generateStep(jobTemplate, __compName, dcUtil.deepCopy(stepsTemplate), stepIndex, app.project.renderQueue.item(j));
            // logger.debug("[createDataAndParameterTemplateOneJob] jobTemplate: " + JSON.stringify(jobTemplate), _submitButtonFileName);
            
            jobTemplate = applyHostReqToTemplate(jobTemplate);
            // logger.debug("[createDataAndParameterTemplateOneJob] jobTemplate applyHostReqToTemplate: " + JSON.stringify(jobTemplate), _submitButtonFileName);
            
            // Add data to the parameter template
            jobParams.parameterValues.push(applyDataToParameterTemplate(__compName + "_Frames", frameList));
            jobParams.parameterValues.push(applyDataToParameterTemplate(__compName + "_CompName", app.project.renderQueue.item(j).comp.name));
            jobParams.parameterValues.push(applyDataToParameterTemplate(__compName + "_OutputPattern", dcUtil.removePercentageFromFileName(getRenderQueueItemData(app.project.renderQueue.item(j))["fileName"])));
            jobParams.parameterValues.push(applyDataToParameterTemplate(__compName + "_OutputFormat", getRenderQueueItemData(app.project.renderQueue.item(j))["extension"]));
            jobParams.parameterValues.push(applyDataToParameterTemplate(__compName + "_OutputFilePath", getCompleteDirectory(app.project.renderQueue.item(j))));
            
            stepIndex++;
        }

        return {
            "jobTemplate": jobTemplate,
            "jobParams": jobParams
        }
    }

    function createDataAndParameterTemplateSeparateJobs(renderQueueItem, itemName)
    {
        var compNameToCheck = dcUtil.removeIllegalCharacters(renderQueueItem.comp.name);
        var frameList = getFrameList(renderQueueItem);
        jobTemplate = generatePartialTemplate();
        // Add data to the main template
        jobTemplate.parameterDefinitions.push(applyDataToTemplate(itemName + "_Frames", dcDataTemplate.Frames));
        jobTemplate.parameterDefinitions.push(applyDataToTemplate(itemName + "_OutputPattern", dcDataTemplate.OutputPattern));
        jobTemplate.parameterDefinitions.push(applyDataToTemplate(itemName + "_OutputFormat", dcDataTemplate.OutputFormat));
        // jobTemplate.parameterDefinitions.push(applyDataToTemplate(itemName + "_CompName", dcDataTemplate.CompName));
        jobTemplate.parameterDefinitions.push(applyDataToTemplate(itemName + "_OutputFilePath", dcDataTemplate.OutputFilePath));
        __stepsTemplate = jobTemplate.steps;
        jobTemplate.steps = [];
        jobTemplate = generateStep(jobTemplate, itemName, __stepsTemplate, 1, renderQueueItem);
        jobTemplate = applyHostReqToTemplate(jobTemplate);
        jobParams = {};
        jobParams.parameterValues = [];
        jobParams.parameterValues.push(applyDataToParameterTemplate("AfterEffectsProjectFile", app.project.file.fsName));
        jobParams.parameterValues.push(applyDataToParameterTemplate("deadline:targetTaskRunStatus", dcProperties.deadlineJobParameters.targetTaskRunStatus.get()));
        jobParams.parameterValues.push(applyDataToParameterTemplate("deadline:maxFailedTasksCount", dcProperties.deadlineJobParameters.maxFailedTasksCount.get()));
        jobParams.parameterValues.push(applyDataToParameterTemplate("deadline:maxRetriesPerTask", dcProperties.deadlineJobParameters.maxRetriesPerTask.get()));
        jobParams.parameterValues.push(applyDataToParameterTemplate("deadline:priority", dcProperties.deadlineJobParameters.priority.get()));
        jobParams.parameterValues.push(applyDataToParameterTemplate(itemName + "_Frames", frameList));
        // jobParams.parameterValues.push(applyDataToParameterTemplate(itemName + "_CompName", comp));
        jobParams.parameterValues.push(applyDataToParameterTemplate(itemName + "_OutputPattern", dcUtil.removePercentageFromFileName((getRenderQueueItemData(renderQueueItem)["fileName"]))));
        jobParams.parameterValues.push(applyDataToParameterTemplate(itemName + "_OutputFormat", getRenderQueueItemData(renderQueueItem)["extension"]));
        jobParams.parameterValues.push(applyDataToParameterTemplate(itemName + "_OutputFilePath", getCompleteDirectory(renderQueueItem)));
        
        // Check if item name is the same as the comp name. When submitting layers this will not be the case -> change data to be correct comp name for those submissions
        if(itemName !== compNameToCheck)
        {
            jobTemplate.parameterDefinitions.push(applyDataToTemplate(compNameToCheck + "_CompName", dcDataTemplate.CompName));
            jobParams.parameterValues.push(applyDataToParameterTemplate(compNameToCheck + "_CompName", renderQueueItem.comp.name));
        }
        else{
            jobTemplate.parameterDefinitions.push(applyDataToTemplate(itemName + "_CompName", dcDataTemplate.CompName));
            jobParams.parameterValues.push(applyDataToParameterTemplate(itemName + "_CompName", renderQueueItem.comp.name));
        }
        return {
            "jobTemplate": jobTemplate,
            "jobParams": jobParams
        }
    }
    return {
        "getStartFrame": getStartFrame,
        "getEndFrame": getEndFrame,
        "getCompName": getCompName,
        "getRenderQueueItemData": getRenderQueueItemData,
        "handleSubmitButtonPressed": handleSubmitButtonPressed,
        "getOutputDirectory": getOutputDirectory,
        "getCompleteDirectory": getCompleteDirectory,
        "submitRenderQueueToDeadlineCloud": submitRenderQueueToDeadlineCloud,
        "createDataAndParameterTemplateOneJob": createDataAndParameterTemplateOneJob,
        "createDataAndParameterTemplateSeparateJobs": createDataAndParameterTemplateSeparateJobs,
        "generateAssetReferences": generateAssetReferences
    }
}

dcSubmitButton = __generateSubmitButton();




// Variables for runChecks
var safeToRunScript = true;
var version = app.version.substring(0, app.version.indexOf('x'));

// Global scoped progress window.
var dcLoadingWindow; 

if(dcAeUtil.runChecks())
{
function __generateSettings() {

// Create variable to use for logger
var scriptFileSettingsName = "Settings.jsx";
var AfterEffectsIniFilename = "";

    function getIniFile() {
        /*
        * Get the init ae init file location.
        * Returns path to the ae init file.
        */

        if (AfterEffectsIniFilename == "") {
            var prefix = app.project.file.parent.fsName;
            var projectName = app.project.file.name.replace(/\.aep$/i, '');
            prefix = prefix.replace("\n", "");
            prefix = prefix.replace("\r", "");
            AfterEffectsIniFilename = prefix + "/" + projectName + ".ae_deadlinecloud_submission.json";
            logger.debug(AfterEffectsIniFilename, scriptFileSettingsName);

            dcUtil.normPath(AfterEffectsIniFilename)
        }
        return AfterEffectsIniFilename;

    }

    function getIniSetting(key, defaultValue) {
        /** 
        * Check if given key exists in the ae init file and get the value for the key
        * Return key value (Setting value)
        * @param {string} key - Key name to look for in the file
        * @param {} defaultValue- Default value for given key
        */

        // Check if deadlineCloudConfiguration is empty
        // if yes, read values from ini file
        // if not empty look for the key in the deadlineCloudConfiguration
        var value = defaultValue;
        // If deadlineCloudConfiguration has not been filled, set it to object type and fill with settings from .ini file
        if (deadlineCloudConfiguration == null) {
            logger.debug("Filling Deadline Cloud Config object", scriptFileSettingsName);
            deadlineCloudConfiguration = {};
            fillConfiguration();
        }
        // If key does not exists in deadlineConfiguration, create the key and add the default value. Return default value.
        if (!(deadlineCloudConfiguration.hasOwnProperty(key))) {
            logger.log("Setting default value for '" + key + "'", scriptFileSettingsName, LOG_LEVEL.DEBUG);
            deadlineCloudConfiguration[key] = value;
            return value;
        }
        // If key exists in deadlineConfiguration, get value out and return it
        logger.log("Setting value for '" + key + "' to: " + deadlineCloudConfiguration[key], scriptFileSettingsName, LOG_LEVEL.DEBUG);
        value = deadlineCloudConfiguration[key];
        return value;

    }

    function fillConfiguration() {
        /**
        * Fill global object with data from ini file. This way we only need to look for the .ini file once.
        */
        var filename;
        filename = getIniFile();
        iniFile = File(filename);
        if(iniFile.exists)
        {
            iniFile.open('r');
            var jsonString = iniFile.read();
            iniFile.close();
            deadlineCloudConfiguration = eval("(" + jsonString + ")");
        }
    }

    function saveIniSettings() {
        /**
        * Save all keys and their values from the Deadline Cloud configuration object to the ini file.
        */
        var outputPath;
        var jsonData = JSON.stringify(deadlineCloudConfiguration, null, 4);
        outputPath = getIniFile();
        outputFile = File(outputPath);
        outputFile.open('w');
        outputFile.write(jsonData);
        outputFile.close();
        logger.log("Writing project specific settings to json file.", scriptFileSettingsName, LOG_LEVEL.DEBUG);        
    }

    return {
        "getIniSetting": getIniSetting,
        "saveIniSettings": saveIniSettings
    }
}

dcSettings = __generateSettings();

var config = dcProperties.config.aws_profile.get();
var version = app.version.substring(0, app.version.indexOf('x'));
// Create object to hold all UI variables and init variables
var deadlineCloud = {};
var deadlineCloudConfiguration = null;

var totalCount = app.project.renderQueue.numItems; //used later on in submission script.

// file paths
var projectName = app.project.file.name;
var projectPath = app.project.file.fsName;

if (app.project.renderQueue.numItems != 0) {
    var initCompSelection = app.project.renderQueue.item(1).comp.name;
}

// globals for job submission types
var submissionText = "";
var selectOne = "Select One Comp";
var useQueue = "Submit Entire Queue As One Job";
var allQueueSep = "Submit Entire Queue As Separate Jobs";

function __generateSubmitterUI() {

    // Create variables to use for logger;
    var _scriptFileAESubmitterName = "AESubmitterUI.jsx";
    var LABEL_SIZE = [150, 20]
    var TEXT_SIZE = [500, 18];
    var SHORT_TEXT_SIZE = [160, 18];
    var COMBO_SIZE = [160, 20];
    var SHORT_COMBO_SIZE = [160, 20];
    var BUTTON_SIZE = [36, 20];
    var SLIDER_SIZE = [336, 20];
    var CHECKBOX_A_SIZE = [320, 20];
    var CHECKBOX_B_SIZE = [200, 20];
    var CHECKBOX_C_SIZE = [250, 20];
    var CHECKBOX_D_SIZE = [175, 20];
    var CHECKBOX_E_SIZE = [125, 20];
    var LIST_BOX_SIZE = [700, 300];
    var LIST_BOX_SIZE_SMALL = [700, 100];
    var FILE_BUTTON_SIZE = [100, 30]
    var LAYER_LABEL_SIZE = [300, 20];
    var LAYER_TEXT_SIZE = [35, 18];

    // Create List of footageItems in the scene
    dcProperties.jobAttachments.userAddedInputFiles.set([]);
    dcProperties.footageLabels.ADDED_FOOTAGE_ITEMS.set(0);
    dcProperties.footageLabels.AUTO_DETECTED_FOOTAGE_ITEMS.set(0);
    dcProperties.footageLabels.SELECTED_FOOTAGE_ITEMS.set(0);

    // Create list of input directories
    dcProperties.jobAttachments.userAddedInputDirectories.set([]);
    dcProperties.inputLabels.ADDED_INPUT_ITEMS.set(0);
    dcProperties.inputLabels.AUTO_DETECTED_INPUT_ITEMS.set(0);
    dcProperties.inputLabels.SELECTED_INPUT_ITEMS.set(0);

    // Create list of output directories from the renderqueue
    dcProperties.jobAttachments.userAddedOutputDirectories.set([]);
    dcProperties.outputLabels.ADDED_OUTPUT_ITEMS.set(0);
    dcProperties.outputLabels.AUTO_DETECTED_OUTPUT_ITEMS.set(0);
    dcProperties.outputLabels.SELECTED_OUTPUT_ITEMS.set(0);

    // get the saved defaults from the ini file
    var initUseCompName = dcUtil.parseBool(dcSettings.getIniSetting("UseCompName", "false"));
    var initGroup = dcSettings.getIniSetting("Group", "none");
    var initSubmitScene = dcUtil.parseBool(dcSettings.getIniSetting("SubmitScene", "false"));
    var initMultiProcess = dcUtil.parseBool(dcSettings.getIniSetting("MultiProcess", "false"));
    var initMissingFootage = dcUtil.parseBool(dcSettings.getIniSetting("MissingFootage", "false"));
    var initExportAsXml = dcUtil.parseBool(dcSettings.getIniSetting("ExportAsXml", "false"));
    var initDeleteTempXml = dcUtil.parseBool(dcSettings.getIniSetting("DeleteTempXml", "false"));
    var initUseCompFrameRange = dcUtil.parseBool(dcSettings.getIniSetting("UseCompFrame", "false"));
    var initFirstAndLast = null;
    if (!initUseCompFrameRange) {
        initFirstAndLast = false;
    } else {
        initFirstAndLast = dcUtil.parseBool(dcSettings.getIniSetting("FirstAndLast", "false"));
    }

    var initIgnoreMissingLayers = dcUtil.parseBool(dcSettings.getIniSetting("MissingLayers", "false"));
    var initIgnoreMissingEffects = dcUtil.parseBool(dcSettings.getIniSetting("MissingEffects", "false"));
    var initFailOnWarnings = dcUtil.parseBool(dcSettings.getIniSetting("FailOnWarnings", "false"));
    var initDependentComps = dcUtil.parseBool(dcSettings.getIniSetting("DependentComps", "false"));
    var initSubmitEntireQueue = dcUtil.parseBool(dcSettings.getIniSetting("SubmitEntireQueue", "false"));
    var initLocalRendering = dcUtil.parseBool(dcSettings.getIniSetting("LocalRendering", "false"));
    var initIncludeOutputPath = dcUtil.parseBool(dcSettings.getIniSetting("IncludeOutputPath", "false"));
    var initOverrideFailOnExistingAEProcess = dcUtil.parseBool(dcSettings.getIniSetting("OverrideFailOnExistingAEProcess", "false"));
    var initFailOnExistingAEProcess = dcUtil.parseBool(dcSettings.getIniSetting("FailOnExistingAEProcess", "false"));
    var initIgnoreGPUAccelWarning = dcUtil.parseBool(dcSettings.getIniSetting("IgnoreGPUAccelWarning", "false"));

    var initMultiMachine = dcUtil.parseBool(dcSettings.getIniSetting("MultiMachine", "false"));
    var initFileSize = parseInt(dcSettings.getIniSetting("FileSize", 0));
    var initDeleteFile = dcUtil.parseBool(dcSettings.getIniSetting("DeleteFile", "false"));
    var initMemoryManagement = dcUtil.parseBool(dcSettings.getIniSetting("MemoryManagement", "false"));
    var initImageCachePercentage = parseInt(dcSettings.getIniSetting("ImageCachePercentage", 100));
    var initMaxMemoryPercentage = parseInt(dcSettings.getIniSetting("MaxMemoryPercentage", 100));
    var initCompSubmissionType = dcSettings.getIniSetting("CompSubmissionType", "Select One Comp");

    var initFailedTasksLimit = parseInt(dcSettings.getIniSetting("FailedTasksLimit", 20));
    var initTaskRetryLimit = parseInt(dcSettings.getIniSetting("TaskRetryLimit", 5));
    var initDeadlineCloudPriority = parseInt(dcSettings.getIniSetting("DeadlineCloudPriority", 50));
    var initOutputFolder = dcSettings.getIniSetting("Layers_OutputFolder", "");


    function createUI() {
        // Call init to initialize UI
        initMainUI();

        // Define colors for status boxes
        red = deadlineCloud.winGraphics.newPen(deadlineCloud.winGraphics.BrushType.SOLID_COLOR, [1, 0, 0], 1);
        green = deadlineCloud.winGraphics.newPen(deadlineCloud.winGraphics.BrushType.SOLID_COLOR, [0, 1, 0], 1);

        // Create authentication group and widgets
        authenticateGroup = deadlineCloud.aeSubmitterUI.add("group", undefined);
        authenticateGroup.orientation = "row";

        credsLabel = authenticateGroup.add("statictext", undefined, "Source: ");
        credsLabel.size = [40, 20];

        credsAuthentication = authenticateGroup.add("statictext", undefined, "NOT_VALID");
        credsAuthentication.graphics.foregroundColor = red;
        credsAuthentication.size = [200, 20];

        statusLabel = authenticateGroup.add("statictext", undefined, "Status: ");
        statusLabel.size = [40, 20];
        
        statusAuthentication = authenticateGroup.add("statictext", undefined, "NEEDS_LOGIN");
        statusAuthentication.graphics.foregroundColor = red;
        statusAuthentication.size = [140, 20];

        apiStatusLabel = authenticateGroup.add("statictext", undefined, "Deadline Cloud API: ");
        apiStatusLabel.size = [110, 20];

        apiAuthentication = authenticateGroup.add("statictext", undefined, "False");
        apiAuthentication.graphics.foregroundColor = red;
        apiAuthentication.size = [140, 20];

        // Render Layers button (brings up new dialog)
        buttonsGroup = deadlineCloud.aeSubmitterUI.add("group", undefined);

        // Login Button
        buttonsGroup.loginButton = buttonsGroup.add("button", undefined, "Login");
        buttonsGroup.loginButton.size = [100, 30];
        buttonsGroup.loginButton.onClick = function() {
            var _loginWindow = dcInitData.loadingLoginWindow();
            _loginWindow.text = "Logging in to Deadline Cloud Monitor."
            _loginWindow.children[0].text = "Logging in to Deadline Cloud Monitor."
            var result = dcDeadlineCommands.login(dcProperties.config.aws_profile.get(), dcProperties.config.deadline_cloud_monitor.get());
            _loginWindow.close();
            if(result.return_code == 0){ 
                dcProperties.isLoggedIn.set(true);
            } else{
                dcProperties.isLoggedIn.set(false);
                dcProperties.isAPIAvailable.set(false);
            }
        }
        // Logout Button
        buttonsGroup.logoutButton = buttonsGroup.add("button", undefined, "Logout");
        buttonsGroup.logoutButton.size = [100, 30];
        buttonsGroup.logoutButton.onClick = function() {
            var result = dcDeadlineCommands.logout(dcProperties.config.aws_profile.get(), dcProperties.config.deadline_cloud_monitor.get());
            if(result.return_code == 0){  
                dcProperties.isLoggedIn.set(false);
            } else{
                dcProperties.isLoggedIn.set(false);
            }
            farmList = [];
            queueList = [];
        }
        // Settings Button
        buttonsGroup.settingsButton = buttonsGroup.add("button", undefined, "Settings");
        buttonsGroup.settingsButton.size = [100, 30];
        buttonsGroup.settingsButton.onClick = function() {
            deadlineCloud.aeSubmitterUI.enabled = false;
            logger.info("OPENING SETTINGS WINDOW", _scriptFileAESubmitterName);
            dcSettingsWindow.initDeadlineCloudSettingsWindow(deadlineCloud.aeSubmitterUI);
            
        }

        // Submit Selected Layers Button
        buttonsGroup.submitLayersButton = buttonsGroup.add('button', undefined, 'Submit Selected Layers');
        buttonsGroup.submitLayersButton.size = [180, 30];
        buttonsGroup.submitLayersButton.onClick = function()
        {
            dcProperties.isLoggedIn.get();
            dcProperties.deadlineJobParameters.description.set(descriptionGroup.textComment.text);
            dcProperties.deadlineJobParameters.targetTaskRunStatus.set(initStateGroup.initStateDropdown.selection.text);
            dcProperties.deadlineJobParameters.maxFailedTasksCount.set(parseInt(failedTasksGroup.failedTasksText.text));
            dcProperties.deadlineJobParameters.maxRetriesPerTask.set(parseInt(taskRetryGroup.taskRetryText.text));
            dcProperties.deadlineJobParameters.priority.set(parseInt(deadlineCloudPriorityGroup.textPriority.text));
            dcSubmitLayerButton.SubmitLayersToDeadline();
        }
        //submit button - goes through the selected layers and submits them
        buttonsGroup.submitButton = buttonsGroup.add('button', undefined, 'Submit');
        buttonsGroup.submitButton.onClick = function() 
        {
            dcProperties.deadlineJobParameters.description.set(descriptionGroup.textComment.text);
            dcProperties.deadlineJobParameters.targetTaskRunStatus.set(initStateGroup.initStateDropdown.selection.text);
            dcProperties.deadlineJobParameters.maxFailedTasksCount.set(parseInt(failedTasksGroup.failedTasksText.text));
            dcProperties.deadlineJobParameters.maxRetriesPerTask.set(parseInt(taskRetryGroup.taskRetryText.text));
            dcProperties.deadlineJobParameters.priority.set(parseInt(deadlineCloudPriorityGroup.textPriority.text));
            dcSubmitButton.handleSubmitButtonPressed();
        }
        buttonsGroup.exportBundleButton = buttonsGroup.add('button', undefined, 'Export Bundle');
        buttonsGroup.exportBundleButton.size = [100, 30];
        buttonsGroup.exportBundleButton.onClick = function() 
        {
            dcProperties.deadlineJobParameters.description.set(descriptionGroup.textComment.text);
            dcProperties.deadlineJobParameters.targetTaskRunStatus.set(initStateGroup.initStateDropdown.selection.text);
            dcProperties.deadlineJobParameters.maxFailedTasksCount.set(parseInt(failedTasksGroup.failedTasksText.text));
            dcProperties.deadlineJobParameters.maxRetriesPerTask.set(parseInt(taskRetryGroup.taskRetryText.text));
            dcProperties.deadlineJobParameters.priority.set(parseInt(deadlineCloudPriorityGroup.textPriority.text));

            var exportCount = 0;
            if (dcProperties.config.job_history_dir.get() == "")
            {
                alert("Please add a 'Job History Directory' in the 'Settings' before exporting the job bundle.");
                return;
            }
            var exportText = compSubmissionGroup.compSubmission.selection.toString();
            if(exportText == selectOne)
            {
                exportBundleToJobHistoryDir(app.project.renderQueue.item(compSelectionGroup.compSelection.selection.index + 1), dcProperties.config.job_history_dir.get(), compSelectionGroup.compSelection.selection.text);
                return alert("Export for " + compSelectionGroup.compSelection.selection.text + " was successful. Export can be found at: " + dcProperties.config.job_history_dir.get());
            }
            else if(exportText == useQueue)
            {
                exportBundleToJobHistoryDir(null, dcProperties.config.job_history_dir.get(), null);
                return alert("Export for the entire renderQueue was successful. Export can be found at: " + dcProperties.config.job_history_dir.get());
            }
            for (i = 1; i <= app.project.renderQueue.numItems; ++i) 
            {
                exportBundleToJobHistoryDir(app.project.renderQueue.item(i), dcProperties.config.job_history_dir.get(), app.project.renderQueue.item(i).comp.name);
                exportCount+=1;
            }
            alert("Completed job export.\n" + exportCount + " of " + app.project.renderQueue.numItems + " jobs were exported successfully.\n" + "Exports can be found at: " + dcProperties.config.job_history_dir.get() + ".");
        }   

        // Create main close button
        buttonsGroup.closeButton = buttonsGroup.add('button', undefined, 'Close');
        buttonsGroup.closeButton.size = [100, 30];
        buttonsGroup.closeButton.onClick = function() {
            dcCloseButton.closeButtonFncMain(deadlineCloud.aeSubmitterUI);
        }

        // Create Progress Bar for Submission Button
        progressBarPanel = deadlineCloud.aeSubmitterUI.add('group', undefined);
        progressBarPanel.alignment = [ScriptUI.Alignment.RIGHT, ScriptUI.Alignment.TOP];
        progressBarPanel.progressBar = progressBarPanel.add('progressbar', undefined, '');
        progressBarPanel.progressBar.size = [200, 20];
        progressBarPanel.progressBar.value = 0;

        deadlineCloud.aeSubmitterUI.center()
        deadlineCloud.aeSubmitterUI.show();
        deadlineCloud.aeSubmitterUI.update();

        initCallbacks();
        // Fill farm and queue list again. When we startup and we are logged out the lists are empty
        var result = dcDeadlineCommands.credentialStatus(dcProperties.config.aws_profile.get());
        if(result.status == "AUTHENTICATED")
        {
            // var result = dcDeadlineCommands.login(dcProperties.config.aws_profile.get(), dcProperties.config.deadline_cloud_monitor.get());
            dcProperties.isLoggedIn.set(true);
            dcProperties.isAPIAvailable.set(true);
        }
        else{
            dcProperties.isLoggedIn.set(false);
            dcProperties.isAPIAvailable.set(false);
        }
    }


    function initMainUI() {
        /**
         * Initialize all widgets separate by tab
         */
        logger.log("Initializing Main UI", _scriptFileAESubmitterName, LOG_LEVEL.INFO);
        // Create main window object
        deadlineCloud.aeSubmitterUI = new Window("palette", "Submit After Effects To Deadline");
        deadlineCloud.winGraphics = deadlineCloud.aeSubmitterUI.graphics;
        // Create a TabbedPanel
        deadlineCloud.mainPanel = deadlineCloud.aeSubmitterUI.add("tabbedpanel", undefined, "");
        deadlineCloud.aeSubmitterUI.autoDetectFootageList = dcProperties.jobAttachments.autoDetectedInputFiles.get();
        deadlineCloud.aeSubmitterUI.autoDetectInputList = dcProperties.jobAttachments.autoDetectInputDirectories.get();
        deadlineCloud.aeSubmitterUI.autoDetectOutputList = dcProperties.jobAttachments.autoDetectOutputDirectories.get();
        //deadlineCloud.aeSubmitterUI.loginState = false;
        initSharedJobSettingsTab();

        initJobSpecific();

        initAdvanced();

        initJobAttachment();

        initHostRequirements();

        initConnections();
    }

    function initConnections() {
        /**
         * Initialize all functionality attacked to widgets that are initialized in init.
         */
        logger.log("Initializing Main UI Connections", _scriptFileAESubmitterName, LOG_LEVEL.INFO);

        // Call Connections for the widgets in the Shared Job Settings tab(functionality)
        initConnectionsSharedJobSettings();

        // Call Connections for the widgets in the Advanced tab(functionality)
        initConnectionsAdvanced();

        // Call Connections for the widgets in the Job-Specific Settings tab(functionality)
        initConnectionsJobSpecific();

        // Call Connections for the widgets in the Job Attachment tab(functionality)
        initConnectionsJobAttachment();

        // Call Connections for the widgets in Host Requirements tab(functionality)
        initConnectionsHostRequirements();
    }

    function initSharedJobSettingsTab() {
        logger.log("Initializing Shared Job Settings Tab", _scriptFileAESubmitterName, LOG_LEVEL.INFO);

        // Create Shared Job Settings tab
        deadlineCloud.tabSharedJobSettings = deadlineCloud.mainPanel.add("tab", undefined, "Shared Job Settings");
        deadlineCloud.tabSharedJobSettings.orientation = "column";

        // Add UI elements to the Shared Job Settings tab
        // Create job properties panel and widgets
        deadlineCloud.jobPanel = deadlineCloud.tabSharedJobSettings.add("panel", undefined, "Job Properties");
        deadlineCloud.jobPanel.orientation = "column";
        deadlineCloud.jobPanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];

        // Job group creation
        jobGroup = deadlineCloud.jobPanel.add("group", undefined);
        jobGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        jobGroup.orientation = "row";
        jobGroup.labelJob = jobGroup.add("statictext", undefined, "Name");
        jobGroup.labelJob.size = LABEL_SIZE;
        jobGroup.labelJob.helpTip = 'The name of your job. This is optional, and if left blank, it will default to "Untitled". Disabled if Use Comp Name is enabled.';
        var projectNameWithoutExtension = projectName.split(".")[0];
        jobGroup.jobName = jobGroup.add("edittext", undefined, dcUtil.removePercentageFromFileName(projectNameWithoutExtension));
        jobGroup.jobName.enabled = !initUseCompName;
        jobGroup.jobName.size = TEXT_SIZE;


        // Group checkbox creation
        checkboxGroup = deadlineCloud.jobPanel.add("group", undefined);
        checkboxGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        checkboxGroup.orientation = "row";
        checkboxGroup.labelCheckBox = checkboxGroup.add("statictext", undefined, "");
        checkboxGroup.labelCheckBox.size = LABEL_SIZE;
        checkboxGroup.useNameCheckBox = checkboxGroup.add("checkbox", undefined, "Use File Name As Job Name");
        checkboxGroup.useNameCheckBox.value = initUseCompName;
        checkboxGroup.useNameCheckBox.size = TEXT_SIZE;
        checkboxGroup.useNameCheckBox.helpTip = "If enabled, the job's name will be the File name.";

        // Description group creation
        descriptionGroup = deadlineCloud.jobPanel.add("group");
        descriptionGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        descriptionGroup.orientation = "row";
        descriptionGroup.labelComment = descriptionGroup.add("statictext", undefined, "Description");
        descriptionGroup.labelComment.size = LABEL_SIZE;
        descriptionGroup.helpTip = 'A simple description of your job. This is optional and can be left blank.';
        descriptionGroup.textComment = descriptionGroup.add("edittext", undefined, "");
        descriptionGroup.textComment.size = TEXT_SIZE;

        // Create Deadline Cloud Priority group and widgets
        deadlineCloudPriorityGroup = deadlineCloud.jobPanel.add("group", undefined);
        deadlineCloudPriorityGroup.orientation = "row";
        deadlineCloudPriorityGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        deadlineCloudPriorityGroup.labelPriority = deadlineCloudPriorityGroup.add("statictext", undefined, "Priority");
        deadlineCloudPriorityGroup.labelPriority.size = LABEL_SIZE;
        deadlineCloudPriorityGroup.labelPriority.helpTip = 'A job can have a numeric priority range, with 0 being the lowest priority.';
        deadlineCloudPriorityGroup.textPriority = deadlineCloudPriorityGroup.add("edittext", undefined, initDeadlineCloudPriority);
        deadlineCloudPriorityGroup.textPriority.size = COMBO_SIZE;

        deadlineCloudPriorityGroup.prioritySlider = deadlineCloudPriorityGroup.add('slider', undefined, initDeadlineCloudPriority, 0, 100);
        deadlineCloudPriorityGroup.prioritySlider.size = SLIDER_SIZE;

        // Create initial state group and widgets
        initStateGroup = deadlineCloud.jobPanel.add("group", undefined);
        initStateGroup.orientation = "row"
        initStateGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        initStateGroup.initStateLabel = initStateGroup.add("statictext", undefined, "Initial State");
        initStateGroup.initStateLabel.size = LABEL_SIZE;
        initStateGroup.initStateDropdown = initStateGroup.add("dropdownlist", undefined, ["READY", "SUSPENDED"]);
        initStateGroup.initStateDropdown.size = SHORT_TEXT_SIZE;
        initStateGroup.initStateDropdown.selection = 0;

        // Create failed tasks group and widgets
        failedTasksGroup = deadlineCloud.jobPanel.add("group", undefined);
        failedTasksGroup.orientation = "row"
        failedTasksGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        failedTasksGroup.failedTasksLabel = failedTasksGroup.add("statictext", undefined, "Maximum Failed Tasks Count");
        failedTasksGroup.failedTasksLabel.size = LABEL_SIZE;
        failedTasksGroup.failedTasksText = failedTasksGroup.add("edittext", undefined, initFailedTasksLimit);
        failedTasksGroup.failedTasksText.size = SHORT_TEXT_SIZE;

        failedTasksGroup.failedTasksSlider = failedTasksGroup.add('slider', undefined, initFailedTasksLimit, 0, 100);
        failedTasksGroup.failedTasksSlider.size = SLIDER_SIZE;

        // Create Task Retry Limit group and widgets
        taskRetryGroup = deadlineCloud.jobPanel.add("group", undefined);
        taskRetryGroup.orientation = "row"
        taskRetryGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        taskRetryGroup.taskRetryLabel = taskRetryGroup.add("statictext", undefined, "Maximum Retries Per Task");
        taskRetryGroup.taskRetryLabel.size = LABEL_SIZE;
        taskRetryGroup.taskRetryText = taskRetryGroup.add("edittext", undefined, initTaskRetryLimit);
        taskRetryGroup.taskRetryText.size = SHORT_TEXT_SIZE;

        taskRetryGroup.taskRetrySlider = taskRetryGroup.add('slider', undefined, initTaskRetryLimit, 0, 100);
        taskRetryGroup.taskRetrySlider.size = SLIDER_SIZE;

        // Create Deadline Cloud Settings panel
        deadlineCloud.deadlineCloudPanel = deadlineCloud.tabSharedJobSettings.add("panel", undefined, "Deadline Cloud Settings");
        deadlineCloud.deadlineCloudPanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        deadlineCloud.deadlineCloudPanel.orientation = "column";

        // Create farm time group and widgets
        farmTimeGroup = deadlineCloud.deadlineCloudPanel.add("group", undefined);
        farmTimeGroup.orientation = "row"
        farmTimeGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        farmTimeGroup.farmTimeLabel = farmTimeGroup.add("statictext", undefined, "Farm " + "Default Farm");
        farmTimeGroup.farmTimeLabel.size = LAYER_LABEL_SIZE;

        // Create Queue group and widgets
        queueGroup = deadlineCloud.deadlineCloudPanel.add("group", undefined);
        queueGroup.orientation = "row"
        queueGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        queueGroup.qLabel = queueGroup.add("statictext", undefined, "Queue " + "Default Queue");
        queueGroup.qLabel.size = LAYER_LABEL_SIZE;

        // Create Installation Requirements panel
        var instReqPanel = deadlineCloud.tabSharedJobSettings.add("panel", undefined, "Installation Requirements");
        instReqPanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        instReqPanel.orientation = "column";

        //------------------------------------------------------------------------------------

        // Create Instal req group and widgets
        overrideInstReqGroup = instReqPanel.add("group", undefined);
        overrideInstReqGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        overrideInstReqGroup.orientation = "row";
        // CB = checkbox
        overrideInstReqGroup.overrideInstReqCB = overrideInstReqGroup.add("checkbox", undefined, "");
        overrideInstReqGroup.overrideInstReqCB.value = true;
        overrideInstReqGroup.overrideInstReqLabel = overrideInstReqGroup.add("statictext", undefined, " Override Installation Requirements");
        overrideInstReqGroup.overrideInstReqLabel.size = [200, 20];
        overrideInstReqGroup.overrideInstReqText = overrideInstReqGroup.add("edittext", undefined, "");
        overrideInstReqGroup.overrideInstReqText.size = [400, 18];

        //------------------------------------------------------------------------------------
    }

    function initAdvanced() {
        logger.log("Initializing Advanced Panel", _scriptFileAESubmitterName, LOG_LEVEL.INFO);

        // Create Advanced AE options panel
        deadlineCloud.aeAdvancedOptionsPanel = deadlineCloud.jobSettingsPanel.add('panel', undefined, 'After Effects Advanced Options');
        deadlineCloud.aeAdvancedOptionsPanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];

        // Create dependent comps group and widgets
        dependentCompsGroup = deadlineCloud.aeAdvancedOptionsPanel.add('group', undefined);
        dependentCompsGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        dependentCompsGroup.dependentComps = dependentCompsGroup.add('checkbox', undefined, 'Comps Are Dependent On Previous Comps');
        dependentCompsGroup.dependentComps.value = initDependentComps;
        dependentCompsGroup.dependentComps.size = CHECKBOX_C_SIZE;
        dependentCompsGroup.dependentComps.helpTip = 'If enabled, the job for each comp in the render queue will be dependent on the job for the comp ahead of it. This is useful if a comp in the render queue uses footage rendered by a comp ahead of it.';
        dependentCompsGroup.firstAndLast = dependentCompsGroup.add('checkbox', undefined, 'Render First And Last Frames Of The Comp First');
        dependentCompsGroup.firstAndLast.value = initFirstAndLast;
        dependentCompsGroup.firstAndLast.helpTip = 'If using the Comp\'s frame list, you can enable this so that the job renders the first and last frames first.';

        // Submit Entire Render Queue
        submitEntireQueueGroup = deadlineCloud.aeAdvancedOptionsPanel.add('group', undefined);
        submitEntireQueueGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        submitEntireQueueGroup.multiProcess = submitEntireQueueGroup.add('checkbox', undefined, 'Multi-Process Rendering');
        submitEntireQueueGroup.multiProcess.value = initMultiProcess;
        submitEntireQueueGroup.multiProcess.size = CHECKBOX_C_SIZE;
        submitEntireQueueGroup.multiProcess.enabled = true;
        submitEntireQueueGroup.multiProcess.helpTip = 'Enable to use multiple processes to render multiple frames simultaneously (After Effects CS3 and later).';
        submitEntireQueueGroup.submitScene = submitEntireQueueGroup.add('checkbox', undefined, 'Submit Project File With Job');
        submitEntireQueueGroup.submitScene.value = initSubmitScene;
        submitEntireQueueGroup.submitScene.size = CHECKBOX_D_SIZE;
        submitEntireQueueGroup.submitScene.helpTip = 'If enabled, the After Effects Project File will be submitted with the job.';

        // Create Ignore Missing Layers and Submit Project File group and widgets
        ignoreMissingLayersGroup = deadlineCloud.aeAdvancedOptionsPanel.add('group', undefined);
        ignoreMissingLayersGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        ignoreMissingLayersGroup.ignoreMissingLayers = ignoreMissingLayersGroup.add('checkbox', undefined, 'Ignore Missing Layer Dependencies');
        ignoreMissingLayersGroup.ignoreMissingLayers.value = initIgnoreMissingLayers;
        ignoreMissingLayersGroup.ignoreMissingLayers.size = CHECKBOX_C_SIZE;
        ignoreMissingLayersGroup.ignoreMissingLayers.helpTip = 'If enabled, Deadline will ignore errors due to missing layer dependencies.';
        ignoreMissingLayersGroup.failOnWarnings = ignoreMissingLayersGroup.add('checkbox', undefined, 'Fail On Warning Messages');
        ignoreMissingLayersGroup.failOnWarnings.value = initFailOnWarnings;
        ignoreMissingLayersGroup.failOnWarnings.size = CHECKBOX_B_SIZE;
        ignoreMissingLayersGroup.failOnWarnings.helpTip = 'If enabled, Deadline will fail the job whenever After Effects prints out a warning message.';
        ignoreMissingLayersGroup.exportAsXml = ignoreMissingLayersGroup.add('checkbox', undefined, 'Export XML Project File');
        ignoreMissingLayersGroup.exportAsXml.value = initExportAsXml;
        ignoreMissingLayersGroup.exportAsXml.size = CHECKBOX_D_SIZE;
        ignoreMissingLayersGroup.exportAsXml.enabled = (parseInt(version) > 8);
        ignoreMissingLayersGroup.exportAsXml.helpTip = 'Enable to export the project file as an XML file for Deadline to render (After Effects CS4 and later). The original project file will be restored after submission. If the current project file is already an XML file, this will do nothing.';

        // Create Ignore Missing Effects and Local Rendering group and widgets
        ignoreMissingEffectsGroup = deadlineCloud.aeAdvancedOptionsPanel.add('group', undefined);
        ignoreMissingEffectsGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        ignoreMissingEffectsGroup.ignoreMissingEffects = ignoreMissingEffectsGroup.add('checkbox', undefined, 'Ignore Missing Effect References');
        ignoreMissingEffectsGroup.ignoreMissingEffects.value = initIgnoreMissingEffects;
        ignoreMissingEffectsGroup.ignoreMissingEffects.size = CHECKBOX_C_SIZE;
        ignoreMissingEffectsGroup.ignoreMissingEffects.helpTip = 'If enabled, Deadline will ignore errors due to missing effect references.';
        ignoreMissingEffectsGroup.missingFootage = ignoreMissingEffectsGroup.add('checkbox', undefined, 'Continue On Missing Footage');
        ignoreMissingEffectsGroup.missingFootage.value = initMissingFootage;
        ignoreMissingEffectsGroup.missingFootage.size = CHECKBOX_B_SIZE;
        ignoreMissingEffectsGroup.missingFootage.enabled = (parseInt(version) > 8);
        ignoreMissingEffectsGroup.missingFootage.helpTip = 'If enabled, rendering will not stop when missing footage is detected (After Effects CS4 and later).';
        ignoreMissingEffectsGroup.deleteTempXml = ignoreMissingEffectsGroup.add('checkbox', undefined, 'Delete XML File After Export');
        ignoreMissingEffectsGroup.deleteTempXml.value = initDeleteTempXml;
        ignoreMissingEffectsGroup.deleteTempXml.size = CHECKBOX_D_SIZE;
        ignoreMissingEffectsGroup.deleteTempXml.enabled = initExportAsXml;
        ignoreMissingEffectsGroup.deleteTempXml.helpTip = 'If enabled, the exported aepx project file will be automatically deleted after job submission (After Effects CS4 and later). If the current project file is already an XML file, this will do nothing.\n\n"Submit Project File With Job" must be enabled for this feature.';

        // Create Fail On Existing AE Process group and widgets
        failOnExistingProcessGroup = deadlineCloud.aeAdvancedOptionsPanel.add('group', undefined);
        failOnExistingProcessGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        failOnExistingProcessGroup.OverrideFailOnExistingAEProcess = failOnExistingProcessGroup.add('checkbox', undefined, 'Override Fail On Existing AE Process');
        failOnExistingProcessGroup.OverrideFailOnExistingAEProcess.value = initOverrideFailOnExistingAEProcess;
        failOnExistingProcessGroup.OverrideFailOnExistingAEProcess.size = CHECKBOX_C_SIZE;
        failOnExistingProcessGroup.OverrideFailOnExistingAEProcess.helpTip = 'If enabled, the global repository setting "Fail on Existing AE Process" will be overridden.';
        failOnExistingProcessGroup.FailOnExistingAEProcess = failOnExistingProcessGroup.add('checkbox', undefined, 'Fail On Existing AE Process');
        failOnExistingProcessGroup.FailOnExistingAEProcess.value = initFailOnExistingAEProcess;
        failOnExistingProcessGroup.FailOnExistingAEProcess.enabled = initOverrideFailOnExistingAEProcess;
        failOnExistingProcessGroup.FailOnExistingAEProcess.size = CHECKBOX_B_SIZE;
        failOnExistingProcessGroup.FailOnExistingAEProcess.helpTip = 'If enabled, the job will be failed if any After Effects instances are currently running on the Worker.\n\nExisting After Effects instances can sometimes cause 3rd party AE plugins to malfunction during network rendering.';

        failOnExistingProcessGroup.localRendering = failOnExistingProcessGroup.add('checkbox', undefined, 'Enable Local Rendering');
        failOnExistingProcessGroup.localRendering.value = initLocalRendering;
        failOnExistingProcessGroup.localRendering.size = CHECKBOX_D_SIZE;
        failOnExistingProcessGroup.localRendering.helpTip = 'If enabled, the frames will be rendered locally, and then copied to their final network location.\n\nNote that this feature requires the Include Output File Path option to be enabled. It is also not supported if using Multi-Machine Rendering.';
        failOnExistingProcessGroup.localRendering.enabled = !initMultiMachine && initIncludeOutputPath;

        // Create Ignore GPU Acceleration Warning group and widgets
        ignoreGPUAccelGroup = deadlineCloud.aeAdvancedOptionsPanel.add('group', undefined);
        ignoreGPUAccelGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        ignoreGPUAccelGroup.ignoreGPUAccelWarning = ignoreGPUAccelGroup.add('checkbox', undefined, 'Ignore GPU Acceleration Warning');
        ignoreGPUAccelGroup.ignoreGPUAccelWarning.value = initIgnoreGPUAccelWarning;
        ignoreGPUAccelGroup.ignoreGPUAccelWarning.size = CHECKBOX_C_SIZE;
        ignoreGPUAccelGroup.ignoreGPUAccelWarning.helpTip = 'If enabled, Deadline will no longer warn you about the project\'s GPU acceleration type.';
        // include the output path
        ignoreGPUAccelGroup.includeOutputPath = ignoreGPUAccelGroup.add('checkbox', undefined, 'Include Output File Path');
        ignoreGPUAccelGroup.includeOutputPath.value = initIncludeOutputPath;
        ignoreGPUAccelGroup.includeOutputPath.size = CHECKBOX_D_SIZE;
        ignoreGPUAccelGroup.includeOutputPath.helpTip = 'If enabled, the output file path will be added to the plugin information file. This is required for Local Rendering.';

        // Create Output Checking panel, group, and widgets
        deadlineCloud.outputPanel = deadlineCloud.aeAdvancedOptionsPanel.add('panel', undefined, 'Output File Checking');
        deadlineCloud.outputPanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        // Output Checking Options
        fileSizeGroup = deadlineCloud.outputPanel.add('group', undefined);
        fileSizeGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        fileSizeGroup.fileSizeLabel = fileSizeGroup.add('statictext', undefined, 'Minimum File Size (KB)');
        fileSizeGroup.fileSizeLabel.size = LABEL_SIZE;
        fileSizeGroup.fileSizeLabel.helpTip = 'If the output file size is less then this value (KB), Deadline will fail the task and requeue it. Set to 0 to disable this feature.\n\nNote that this feature is not supported if using Multi-Machine Rendering.';
        fileSizeGroup.fileSizeLabel.enabled = !initMultiMachine
        fileSizeGroup.fileSize = fileSizeGroup.add('edittext', undefined, initFileSize);
        fileSizeGroup.fileSize.size = SHORT_TEXT_SIZE;
        fileSizeGroup.fileSize.enabled = !initMultiMachine

        fileSizeGroup.fileSizeSlider = fileSizeGroup.add('slider', undefined, initFileSize, 0, 100000);
        fileSizeGroup.fileSizeSlider.size = SLIDER_SIZE;
        fileSizeGroup.fileSizeSlider.enabled = !initMultiMachine

        fileSizeDeleteFileGroup = deadlineCloud.outputPanel.add('group', undefined);
        fileSizeDeleteFileGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        fileSizeDeleteFileGroup.fileSizeDeleteFile = fileSizeDeleteFileGroup.add('checkbox', undefined, 'Delete Files Under Minimum File Size');
        fileSizeDeleteFileGroup.fileSizeDeleteFile.value = initDeleteFile;
        fileSizeDeleteFileGroup.fileSizeDeleteFile.enabled = false;
        fileSizeDeleteFileGroup.fileSizeDeleteFile.size = TEXT_SIZE;
        fileSizeDeleteFileGroup.fileSizeDeleteFile.helpTip = 'If enabled and the output file size is less than the minimum file size (kb), then the file will be deleted.';

        missingFileFailGroup = deadlineCloud.outputPanel.add('group', undefined);
        missingFileFailGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        missingFileFailGroup.failOnMissingFile = missingFileFailGroup.add('checkbox', undefined, 'Fail On Missing Output')
        missingFileFailGroup.failOnMissingFile.value = true;
        missingFileFailGroup.failOnMissingFile.size = TEXT_SIZE;
        missingFileFailGroup.failOnMissingFile.helpTip = 'If enabled and no file is generated, the Deadline Job will fail.\n\nNote that this feature is not supported if using Multi-Machine Rendering.';

        // Create Memory Management panel, group, and widgets
        deadlineCloud.memoryManagementPanel = deadlineCloud.aeAdvancedOptionsPanel.add('panel', undefined, 'Memory Management');
        deadlineCloud.memoryManagementPanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];

        // Enable Memory Management
        memoryManagementGroup = deadlineCloud.memoryManagementPanel.add('group', undefined);
        memoryManagementGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        memoryManagementGroup.memoryManagement = memoryManagementGroup.add('checkbox', undefined, 'Enable Memory Management');
        memoryManagementGroup.memoryManagement.value = initMemoryManagement;
        memoryManagementGroup.memoryManagement.size = TEXT_SIZE;
        memoryManagementGroup.memoryManagement.helpTip = 'Enable to have Deadline control the amount of memory that After Effects uses.';

        // Create Image Cache Percentage group, and widgets
        imageCachePercentageGroup = deadlineCloud.memoryManagementPanel.add('group', undefined);
        imageCachePercentageGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        imageCachePercentageGroup.imageCachePercentageLabel = imageCachePercentageGroup.add('statictext', undefined, 'Image Cache %');
        imageCachePercentageGroup.imageCachePercentageLabel.size = LABEL_SIZE;
        imageCachePercentageGroup.imageCachePercentageLabel.enabled = initMemoryManagement;
        imageCachePercentageGroup.imageCachePercentageLabel.helpTip = 'The maximum amount of memory after effects will use to cache frames.';
        imageCachePercentageGroup.imageCachePercentage = imageCachePercentageGroup.add('edittext', undefined, initImageCachePercentage);
        imageCachePercentageGroup.imageCachePercentage.size = SHORT_TEXT_SIZE;
        imageCachePercentageGroup.imageCachePercentage.enabled = initMemoryManagement;

        imageCachePercentageGroup.imageCachePercentageSlider = imageCachePercentageGroup.add('slider', undefined, initImageCachePercentage, 20, 100);
        imageCachePercentageGroup.imageCachePercentageSlider.size = SLIDER_SIZE;
        imageCachePercentageGroup.imageCachePercentageSlider.enabled = initMemoryManagement;

        // Create Max Memory Percentage group, and widgets
        maxMemoryPercentageGroup = deadlineCloud.memoryManagementPanel.add('group', undefined);
        maxMemoryPercentageGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        maxMemoryPercentageGroup.maxMemoryPercentageLabel = maxMemoryPercentageGroup.add('statictext', undefined, 'Maximum Memory %');
        maxMemoryPercentageGroup.maxMemoryPercentageLabel.size = LABEL_SIZE;
        maxMemoryPercentageGroup.maxMemoryPercentageLabel.enabled = initMemoryManagement;
        maxMemoryPercentageGroup.maxMemoryPercentageLabel.helpTip = 'The maximum amount of memory After Effects can use overall.';
        maxMemoryPercentageGroup.maxMemoryPercentage = maxMemoryPercentageGroup.add('edittext', undefined, initMaxMemoryPercentage);
        maxMemoryPercentageGroup.maxMemoryPercentage.size = SHORT_TEXT_SIZE;
        maxMemoryPercentageGroup.maxMemoryPercentage.enabled = initMemoryManagement;

        maxMemoryPercentageGroup.maxMemoryPercentageSlider = maxMemoryPercentageGroup.add('slider', undefined, initMaxMemoryPercentage, 20, 100);
        maxMemoryPercentageGroup.maxMemoryPercentageSlider.size = SLIDER_SIZE;
        maxMemoryPercentageGroup.maxMemoryPercentageSlider.enabled = initMemoryManagement;
    }

    function initJobSpecific() {
        logger.log("Initializing Job-Specific Tab", _scriptFileAESubmitterName, LOG_LEVEL.INFO);
        // Create Job-Specific Settings panel and widgets
        deadlineCloud.jobSettingsPanel = deadlineCloud.mainPanel.add("tab", undefined, "Job-Specific Settings");
        projPathGroup = deadlineCloud.jobSettingsPanel.add('group', undefined);
        projPathGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        projPathGroup.orientation = "row";
        projPathGroup.projPathLabel = projPathGroup.add('statictext', undefined, 'Project Path');
        projPathGroup.projPathLabel.size = LABEL_SIZE;
        projPathGroup.projPathLabel.helpTip = 'Specify where the output files should be rendered to.';
        projPathGroup.projPathText = projPathGroup.add('edittext', undefined, app.project.file.path);
        projPathGroup.projPathText.size = TEXT_SIZE;
        projPathGroup.projPathText.enabled = false;
        projPathGroup.projButton = projPathGroup.add('button', undefined, '...');
        projPathGroup.projButton.size = BUTTON_SIZE;


        outputFolderGroup = deadlineCloud.jobSettingsPanel.add('group', undefined);
        outputFolderGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        outputFolderGroup.orientation = "row";
        outputFolderGroup.outputFolderLabel = outputFolderGroup.add('statictext', undefined, 'Output Folder');
        outputFolderGroup.outputFolderLabel.size = LABEL_SIZE;
        outputFolderGroup.outputFolderLabel.helpTip = 'Specify where the output files should be rendered to.';
        outputFolderGroup.outputFolderText = outputFolderGroup.add('edittext', undefined, initOutputFolder);
        outputFolderGroup.outputFolderText.size = TEXT_SIZE;
        outputFolderGroup.outputFolderText.enabled = false;
        outputFolderGroup.browseButton = outputFolderGroup.add('button', undefined, '...');
        outputFolderGroup.browseButton.size = BUTTON_SIZE;

        // Create Deadline Cloud options panel
        deadlineCloud.aeOptionsPanel = deadlineCloud.jobSettingsPanel.add('panel', undefined, 'After Effects Options');
        deadlineCloud.aeOptionsPanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];

        // Create frame list group and widgets
        frameListGroup = deadlineCloud.aeOptionsPanel.add('group', undefined);
        frameListGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        frameListGroup.frameListLabel = frameListGroup.add('statictext', undefined, 'Frame List');
        frameListGroup.frameListLabel.size = LABEL_SIZE;
        frameListGroup.frameListLabel.helpTip = 'The list of frames to render.';
        frameListGroup.frameList = frameListGroup.add('edittext', undefined, 0 + "-" + 50);
        frameListGroup.frameList.size = SHORT_TEXT_SIZE;
        frameListGroup.useCompFrameList = frameListGroup.add('checkbox', undefined, 'Use Frame List From The Comp');
        frameListGroup.useCompFrameList.value = initUseCompFrameRange;
        frameListGroup.useCompFrameList.helpTip = 'If enabled, the Comp\'s frame list will be used instead of the frame list in this submitter.';

        // Create Comp submission group and widgets (Select One, Use Selected in RQ, All as separate)
        compSubmissionGroup = deadlineCloud.aeOptionsPanel.add('group', undefined);
        compSubmissionGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        compSubmissionGroup.compSubmissionLabel = compSubmissionGroup.add('statictext', undefined, 'Comp Submission');
        compSubmissionGroup.compSubmissionLabel.size = LABEL_SIZE;
        compSubmissionGroup.compSubmissionLabel.helpTip = 'Choose to select a specific comp, use the selection from the render queue, or submit all comps as separate jobs. ';
        compSubmissionGroup.compSubmission = compSubmissionGroup.add('dropdownlist', undefined, '');
        compSubmissionGroup.compSubmission.size = SHORT_COMBO_SIZE;

        // Create Comp selection group and widgets (if Select One)
        compSelectionGroup = deadlineCloud.aeOptionsPanel.add('group', undefined);
        compSelectionGroup.alignment = [ScriptUI.Alignment.RIGHT, ScriptUI.Alignment.TOP];
        compSelectionGroup.compSelectionLabel = compSubmissionGroup.add('statictext', undefined, 'Comp Selection');
        compSelectionGroup.compSelectionLabel.size = LABEL_SIZE;
        compSelectionGroup.compSelectionLabel.helpTip = 'Choose which Comp from the render queue you would like to submit to Deadline. ';
        compSelectionGroup.compSelection = compSubmissionGroup.add('dropdownlist', undefined, '');
        compSelectionGroup.compSelection.size = SHORT_COMBO_SIZE;
    }

    function initJobAttachment() {
        logger.log("Initializing Job Attachments Tab", _scriptFileAESubmitterName, LOG_LEVEL.INFO);

        // Create Job Attachment panel, and widgets
        deadlineCloud.tabJobAttachment = deadlineCloud.mainPanel.add("tab", undefined, "Job Attachments");

        // Create Attach Input Files panel
        deadlineCloud.attachInputFilesPanel = deadlineCloud.tabJobAttachment.add('panel', undefined, 'Attach Input Files');
        deadlineCloud.attachInputFilesPanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];

        // Create button widgets -> No functionality YET
        listButtonsGroup = deadlineCloud.attachInputFilesPanel.add('group', undefined);
        listButtonsGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        listButtonsGroup.orientation = "row";
        listButtonsGroup.addFileButton = listButtonsGroup.add("button", undefined, "Add...");
        listButtonsGroup.addFileButton.size = FILE_BUTTON_SIZE;
        listButtonsGroup.removeFileButton = listButtonsGroup.add("button", undefined, "Remove Selected");
        listButtonsGroup.removeFileButton.size = FILE_BUTTON_SIZE;
        
        // Create label
        listButtonsGroup.itemLabels = listButtonsGroup.add("statictext", undefined, dcProperties.footageLabels.AUTO_DETECTED_FOOTAGE_ITEMS.get() + " auto, " + dcProperties.footageLabels.ADDED_FOOTAGE_ITEMS.get() + " added, " + dcProperties.footageLabels.SELECTED_FOOTAGE_ITEMS.get() + " selected");
        listButtonsGroup.itemLabels.size = CHECKBOX_A_SIZE;

        listButtonsGroup.autoDetectCheckbox = listButtonsGroup.add("checkbox", undefined, "Show Auto-Detected");
        listButtonsGroup.autoDetectCheckbox.size = CHECKBOX_E_SIZE;
        listButtonsGroup.autoDetectCheckbox.value = true;

        // Create List Box group, and widgets
        listBoxGroup = deadlineCloud.attachInputFilesPanel.add('group', undefined);
        listBoxGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        listBoxGroup.attachFilesListBox = listBoxGroup.add("listbox", undefined, [], {
            multiselect: true
        });
        listBoxGroup.attachFilesListBox.size = LIST_BOX_SIZE;

        // Create Attach Input Directories panel
        deadlineCloud.attachInputDirectoriesFilesPanel = deadlineCloud.tabJobAttachment.add('panel', undefined, 'Attach Input Directories');
        deadlineCloud.attachInputDirectoriesFilesPanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];

        // Create button widgets -> No functionality YET
        directoriesListButtonsGroup = deadlineCloud.attachInputDirectoriesFilesPanel.add('group', undefined);
        directoriesListButtonsGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        directoriesListButtonsGroup.orientation = "row";
        directoriesListButtonsGroup.addFileButton = directoriesListButtonsGroup.add("button", undefined, "Add...");
        directoriesListButtonsGroup.addFileButton.size = FILE_BUTTON_SIZE;
        directoriesListButtonsGroup.removeFileButton = directoriesListButtonsGroup.add("button", undefined, "Remove Selected");
        directoriesListButtonsGroup.removeFileButton.size = FILE_BUTTON_SIZE;
        // Create label
        directoriesListButtonsGroup.itemLabels = directoriesListButtonsGroup.add("statictext", undefined, dcProperties.inputLabels.AUTO_DETECTED_INPUT_ITEMS.get() + " auto, " + dcProperties.inputLabels.ADDED_INPUT_ITEMS.get() + " added, " + dcProperties.inputLabels.SELECTED_INPUT_ITEMS.get() + " selected");
        directoriesListButtonsGroup.itemLabels.size = CHECKBOX_A_SIZE;
        directoriesListButtonsGroup.autoDetectCheckbox = directoriesListButtonsGroup.add("checkbox", undefined, "Show Auto-Detected");
        directoriesListButtonsGroup.autoDetectCheckbox.size = CHECKBOX_E_SIZE;
        directoriesListButtonsGroup.autoDetectCheckbox.value = true;

        // Create List Box group, and widgets
        directoriesListBoxGroup = deadlineCloud.attachInputDirectoriesFilesPanel.add('group', undefined);
        directoriesListBoxGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        directoriesListBoxGroup.attachInputListBox = directoriesListBoxGroup.add("listbox", undefined, [], {
            multiselect: true
        });
        directoriesListBoxGroup.attachInputListBox.size = LIST_BOX_SIZE_SMALL;

        // Create Attach Input Directories panel
        deadlineCloud.specifyOutputDirectoriesPanel = deadlineCloud.tabJobAttachment.add('panel', undefined, 'Specify Output Directories');
        deadlineCloud.specifyOutputDirectoriesPanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];

        // Create button widgets -> No functionality YET
        outputDirectoriesListButtonsGroup = deadlineCloud.specifyOutputDirectoriesPanel.add('group', undefined);
        outputDirectoriesListButtonsGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        outputDirectoriesListButtonsGroup.orientation = "row";
        outputDirectoriesListButtonsGroup.addFileButton = outputDirectoriesListButtonsGroup.add("button", undefined, "Add...");
        outputDirectoriesListButtonsGroup.addFileButton.size = FILE_BUTTON_SIZE;
        outputDirectoriesListButtonsGroup.removeFileButton = outputDirectoriesListButtonsGroup.add("button", undefined, "Remove Selected");
        outputDirectoriesListButtonsGroup.removeFileButton.size = FILE_BUTTON_SIZE;
        // Create label
        outputDirectoriesListButtonsGroup.itemLabels = outputDirectoriesListButtonsGroup.add("statictext", undefined, dcProperties.outputLabels.AUTO_DETECTED_OUTPUT_ITEMS.get() + " auto, " + dcProperties.outputLabels.ADDED_OUTPUT_ITEMS.get() + " added, " + dcProperties.outputLabels.SELECTED_OUTPUT_ITEMS.get() + " selected");
        outputDirectoriesListButtonsGroup.itemLabels.size = CHECKBOX_A_SIZE;
        outputDirectoriesListButtonsGroup.autoDetectCheckBox = outputDirectoriesListButtonsGroup.add("checkbox", undefined, "Show Auto-Detected");
        outputDirectoriesListButtonsGroup.autoDetectCheckBox.size = CHECKBOX_E_SIZE;
        outputDirectoriesListButtonsGroup.autoDetectCheckBox.value = true;

        // Create List Box group, and widgets
        outputDirectoriesListBoxGroup = deadlineCloud.specifyOutputDirectoriesPanel.add('group', undefined);
        outputDirectoriesListBoxGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        outputDirectoriesListBoxGroup.attachOutputListBox = outputDirectoriesListBoxGroup.add("listbox", undefined, [], {
            multiselect: true
        });
        outputDirectoriesListBoxGroup.attachOutputListBox.size = LIST_BOX_SIZE_SMALL;

        // Auto filling listbox on creation.
        autoDetectFootageItems();
        autoDetectOutputItems();
    }

    function initHostRequirements() {
        logger.info("Initializing Host Requirements tab", _scriptFileAESubmitterName);
        
        // Create Job Attachment panel, and widgets
        deadlineCloud.tabHostRequirements = deadlineCloud.mainPanel.add("tab", undefined, "Host Requirements");
        deadlineCloud.tabHostRequirements.orientation = "column";

        // Add UI elements to the Host Requirements tab
        // Create run panel and widgets
        deadlineCloud.runPanel = deadlineCloud.tabHostRequirements.add("panel", undefined, "");
        deadlineCloud.runPanel.orientation = "column";
        deadlineCloud.runPanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        deadlineCloud.runPanel.alignChildren = "left";

        // Run group creation
        runGroup = deadlineCloud.runPanel.add("group", undefined);
        runGroup.orientation = "column";

        runGroup.runAllWorkersCheckBox = runGroup.add("checkbox", undefined, "Run on all available worker hosts");
        runGroup.runAllWorkersCheckBox.size = TEXT_SIZE;
        runGroup.runAllWorkersCheckBox.value = true;
        runGroup.runAllWorkersCheckBox.helpTip = "Run submission on all available worker hosts.";

        runGroup.runRequirementHostCheckBox = runGroup.add("checkbox", undefined, "Run on worker hosts that meet the following requirements");
        runGroup.runRequirementHostCheckBox.size = TEXT_SIZE;
        runGroup.runRequirementHostCheckBox.value = !runGroup.runAllWorkersCheckBox.value;
        runGroup.runRequirementHostCheckBox.helpTip = "Run submission only on workers that have the minimum requirements.";

        runGroup.fieldsLabel = runGroup.add("statictext", undefined, "All fields below are optional");
        runGroup.fieldsLabel.size = TEXT_SIZE;

        // Create OS panel and widgets
        deadlineCloud.osPanel = deadlineCloud.tabHostRequirements.add("panel", undefined, "");
        deadlineCloud.osPanel.orientation = "column";
        deadlineCloud.osPanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        deadlineCloud.osPanel.alignChildren = "left";

        // OS group creation
        osGroup = deadlineCloud.osPanel.add("group", undefined);
        osGroup.orientation = "column"
        osGroup.orientation = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];


        osGroup.OSLabel = osGroup.add("statictext", undefined, "Operating System");
        osGroup.OSLabel.size = TEXT_SIZE;

        osGroup.OSDropdownList = osGroup.add("dropdownlist", undefined, ["- ", "Windows", "MacOS", "Linux"]);
        osGroup.OSDropdownList.size = SHORT_TEXT_SIZE;
        osGroup.OSDropdownList.selection = 0;

        // CPU Architecture group creation
        cpuArchGroup = deadlineCloud.osPanel.add("group", undefined);
        cpuArchGroup.orientation = "column"
        cpuArchGroup.orientation = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];


        cpuArchGroup.cpuLabel = cpuArchGroup.add("statictext", undefined, "CPU Architecture");
        cpuArchGroup.cpuLabel.size = TEXT_SIZE;

        cpuArchGroup.cpuDropdownList = cpuArchGroup.add("dropdownlist", undefined, ["- ", "x86_64", "arm64"]);
        cpuArchGroup.cpuDropdownList.size = SHORT_TEXT_SIZE;
        cpuArchGroup.cpuDropdownList.selection = 0;

        // Create Hardware panel and widgets
        deadlineCloud.hardwarePanel = deadlineCloud.tabHostRequirements.add("panel", undefined, "Hardware requirements");
        deadlineCloud.hardwarePanel.orientation = "column";
        deadlineCloud.hardwarePanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        deadlineCloud.hardwarePanel.alignChildren = "left";

        // CPU group creation
        cpuGroup = deadlineCloud.hardwarePanel.add("group", undefined);
        cpuGroup.orientation = "row";

        cpuGroup.cpuLabel = cpuGroup.add("statictext", undefined, "vCPUs");
        cpuGroup.cpuLabel.size = SHORT_TEXT_SIZE;

        cpuGroup.cpuMinLabel = cpuGroup.add("statictext", undefined, "Min");
        cpuGroup.cpuMinLabel.size = LAYER_TEXT_SIZE;

        cpuGroup.cpuMinText = cpuGroup.add("edittext", undefined, "");
        cpuGroup.cpuMinText.size = SHORT_TEXT_SIZE;

        cpuGroup.cpuMaxLabel = cpuGroup.add("statictext", undefined, "Max");
        cpuGroup.cpuMaxLabel.size = LAYER_TEXT_SIZE;

        cpuGroup.cpuMaxText = cpuGroup.add("edittext", undefined, "");
        cpuGroup.cpuMaxText.size = SHORT_TEXT_SIZE;

        // Memory group creation
        memoryGroup = deadlineCloud.hardwarePanel.add("group", undefined);
        memoryGroup.orientation = "row";

        memoryGroup.memoryLabel = memoryGroup.add("statictext", undefined, "Memory (GiB)");
        memoryGroup.memoryLabel.size = SHORT_TEXT_SIZE;

        memoryGroup.memoryMinLabel = memoryGroup.add("statictext", undefined, "Min");
        memoryGroup.memoryMinLabel.size = LAYER_TEXT_SIZE;

        memoryGroup.memoryMinText = memoryGroup.add("edittext", undefined, "");
        memoryGroup.memoryMinText.size = SHORT_TEXT_SIZE;

        memoryGroup.memoryMaxLabel = memoryGroup.add("statictext", undefined, "Max");
        memoryGroup.memoryMaxLabel.size = LAYER_TEXT_SIZE;

        memoryGroup.memoryMaxText = memoryGroup.add("edittext", undefined, "");
        memoryGroup.memoryMaxText.size = SHORT_TEXT_SIZE;

        // GPU group creation
        gpuGroup = deadlineCloud.hardwarePanel.add("group", undefined);
        gpuGroup.orientation = "row";

        gpuGroup.gpuLabel = gpuGroup.add("statictext", undefined, "GPUs");
        gpuGroup.gpuLabel.size = SHORT_TEXT_SIZE;

        gpuGroup.gpuMinLabel = gpuGroup.add("statictext", undefined, "Min");
        gpuGroup.gpuMinLabel.size = LAYER_TEXT_SIZE;

        gpuGroup.gpuMinText = gpuGroup.add("edittext", undefined, "");
        gpuGroup.gpuMinText.size = SHORT_TEXT_SIZE;

        gpuGroup.gpuMaxLabel = gpuGroup.add("statictext", undefined, "Max");
        gpuGroup.gpuMaxLabel.size = LAYER_TEXT_SIZE;

        gpuGroup.gpuMaxText = gpuGroup.add("edittext", undefined, "");
        gpuGroup.gpuMaxText.size = SHORT_TEXT_SIZE;

        // GPU MEMORY group creation
        gpuMemoryGroup = deadlineCloud.hardwarePanel.add("group", undefined);
        gpuMemoryGroup.orientation = "row";

        gpuMemoryGroup.gpuMemoryLabel = gpuMemoryGroup.add("statictext", undefined, "GPU Memory (GiB)");
        gpuMemoryGroup.gpuMemoryLabel.size = SHORT_TEXT_SIZE;

        gpuMemoryGroup.gpuMemoryMinLabel = gpuMemoryGroup.add("statictext", undefined, "Min");
        gpuMemoryGroup.gpuMemoryMinLabel.size = LAYER_TEXT_SIZE;

        gpuMemoryGroup.gpuMemoryMinText = gpuMemoryGroup.add("edittext", undefined, "");
        gpuMemoryGroup.gpuMemoryMinText.size = SHORT_TEXT_SIZE;

        gpuMemoryGroup.gpuMemoryMaxLabel = gpuMemoryGroup.add("statictext", undefined, "Max");
        gpuMemoryGroup.gpuMemoryMaxLabel.size = LAYER_TEXT_SIZE;

        gpuMemoryGroup.gpuMemoryMaxText = gpuMemoryGroup.add("edittext", undefined, "");
        gpuMemoryGroup.gpuMemoryMaxText.size = SHORT_TEXT_SIZE;

        // Scratch Space group creation
        scratchSpaceGroup = deadlineCloud.hardwarePanel.add("group", undefined);
        scratchSpaceGroup.orientation = "row";

        scratchSpaceGroup.scratchSpaceLabel = scratchSpaceGroup.add("statictext", undefined, "Scratch Space");
        scratchSpaceGroup.scratchSpaceLabel.size = SHORT_TEXT_SIZE;

        scratchSpaceGroup.scratchSpaceMinLabel = scratchSpaceGroup.add("statictext", undefined, "Min");
        scratchSpaceGroup.scratchSpaceMinLabel.size = LAYER_TEXT_SIZE;

        scratchSpaceGroup.scratchSpaceMinText = scratchSpaceGroup.add("edittext", undefined, "");
        scratchSpaceGroup.scratchSpaceMinText.size = SHORT_TEXT_SIZE;

        scratchSpaceGroup.scratchSpaceMaxLabel = scratchSpaceGroup.add("statictext", undefined, "Max");
        scratchSpaceGroup.scratchSpaceMaxLabel.size = LAYER_TEXT_SIZE;

        scratchSpaceGroup.scratchSpaceMaxText = scratchSpaceGroup.add("edittext", undefined, "");
        scratchSpaceGroup.scratchSpaceMaxText.size = SHORT_TEXT_SIZE;

        // Create Custom Host Requirements panel and widgets
        deadlineCloud.customHostRequirementPanel = deadlineCloud.tabHostRequirements.add("panel", undefined, "Custom host requirements");
        deadlineCloud.customHostRequirementPanel.orientation = "column";
        deadlineCloud.customHostRequirementPanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];

        // Button group creation
        createRequirementButtonGroup = deadlineCloud.customHostRequirementPanel.add("group", undefined);
        createRequirementButtonGroup.orientation = "row";

        createRequirementButtonGroup.addAmountButton = createRequirementButtonGroup.add('button', undefined, 'Add amount');
        createRequirementButtonGroup.addAmountButton.size = [100, 30];

        createRequirementButtonGroup.addAttributeButton = createRequirementButtonGroup.add('button', undefined, 'Add attribute');
        createRequirementButtonGroup.addAttributeButton.size = [100, 30];

        // Set panels to enabled or disabled based on checkbox selection
        if (runGroup.runAllWorkersCheckBox) {
            deadlineCloud.osPanel.enabled = !runGroup.runAllWorkersCheckBox;
            deadlineCloud.hardwarePanel.enabled = !runGroup.runAllWorkersCheckBox;
            deadlineCloud.customHostRequirementPanel.enabled = !runGroup.runAllWorkersCheckBox;
        }
    }
    
    function initConnectionsSharedJobSettings() {
        logger.log("Initializing Shared Job Settings Connections", _scriptFileAESubmitterName, LOG_LEVEL.INFO);
        var queuedCount = dcAeUtil.getQueuedCompCount();
        // Remove extension from project name
        var projectNameWithoutExtension = projectName.split(".")[0];
        projectNameWithoutExtension = dcUtil.removePercentageFromFileName(projectNameWithoutExtension);
        // On change functions: Add changed value to the Deadline Cloud Configuration Object
        // JobName
        if (initUseCompName == true) {
            jobGroup.jobName.text = dcUtil.removePercentageFromFileName(projectNameWithoutExtension);
        }

        // Functionality use project name checkbox + changing Deadline Cloud config
        checkboxGroup.useNameCheckBox.onClick = function() {
            if ((jobGroup.jobName.text == dcUtil.removePercentageFromFileName(projectNameWithoutExtension))) {
                jobGroup.jobName.text = dcUtil.removePercentageFromFileName(projectNameWithoutExtension);
                jobGroup.jobName.enabled = !this.value;
                logger.log("Set UseCompName to false", _scriptFileAESubmitterName, LOG_LEVEL.DEBUG);
                deadlineCloudConfiguration["UseCompName"] = "false";
                return;
            }
            jobGroup.jobName.enabled = !this.value;
            jobGroup.jobName.text = dcUtil.removePercentageFromFileName(projectNameWithoutExtension);
            logger.log("Set UseCompName to true", _scriptFileAESubmitterName, LOG_LEVEL.DEBUG);
            deadlineCloudConfiguration["UseCompName"] = "true";
        }
        
        // Failed task functionality
        failedTasksGroup.failedTasksSlider.onChange = function() {
            dcUtil.changeTextValue(failedTasksGroup.failedTasksSlider, failedTasksGroup.failedTasksText, 0, 100);
            makeClickHandler("FailedTasksLimit", failedTasksGroup.failedTasksSlider, Math.round);
        }

        failedTasksGroup.failedTasksText.onChange = function() {
            dcUtil.editTextIntValidation(failedTasksGroup.failedTasksText, failedTasksGroup.failedTasksSlider);
            dcUtil.changeSliderValue(failedTasksGroup.failedTasksSlider, failedTasksGroup.failedTasksText, 0, 100);
            makeClickHandler("FailedTasksLimit", failedTasksGroup.failedTasksSlider, Math.round);
        }

        // Task retry functionality
        taskRetryGroup.taskRetrySlider.onChange = function() {
            dcUtil.changeTextValue(taskRetryGroup.taskRetrySlider, taskRetryGroup.taskRetryText, 0, 100);
            makeClickHandler("TaskRetryLimit", taskRetryGroup.taskRetrySlider, Math.round);
        }
        taskRetryGroup.taskRetryText.onChange = function() {
            dcUtil.editTextIntValidation(taskRetryGroup.taskRetryText, taskRetryGroup.taskRetrySlider);
            dcUtil.changeSliderValue(taskRetryGroup.taskRetrySlider, taskRetryGroup.taskRetryText, 0, 100);
            makeClickHandler("TaskRetryLimit", taskRetryGroup.taskRetrySlider, Math.round);
        }

        // Deadline Cloud Priority slider functionality
        deadlineCloudPriorityGroup.prioritySlider.onChange = function() {
            dcUtil.changeTextValue(deadlineCloudPriorityGroup.prioritySlider, deadlineCloudPriorityGroup.textPriority, 0, 100);
            makeClickHandler("DeadlineCloudPriority", deadlineCloudPriorityGroup.prioritySlider, Math.round);
        }
        deadlineCloudPriorityGroup.textPriority.onChange = function() {
            dcUtil.editTextIntValidation(deadlineCloudPriorityGroup.textPriority, deadlineCloudPriorityGroup.prioritySlider);
            dcUtil.changeSliderValue(deadlineCloudPriorityGroup.prioritySlider, deadlineCloudPriorityGroup.textPriority, 0, 100);
            makeClickHandler("DeadlineCloudPriority", deadlineCloudPriorityGroup.prioritySlider, Math.round);
        }

        dcProperties.defaultFarm.add_listener(function(newValue) {
            farmTimeGroup.farmTimeLabel.text = "Farm: " + newValue;
        });

        dcProperties.defaultQueue.add_listener(function(newValue){
            queueGroup.qLabel.text = "Queue: " + newValue;
        });
    }

    function initConnectionsAdvanced() {
        logger.log("Initializing Advanced Connections", _scriptFileAESubmitterName, LOG_LEVEL.INFO);
        var queuedCount = dcAeUtil.getQueuedCompCount();

        // Dependent comp groups functionality
        dependentCompsGroup.dependentComps.enabled = (totalCount > 1 && submissionText == allQueueSep) || (queuedCount > 1 && submissionText == useQueue) && !initSubmitEntireQueue;
        dependentCompsGroup.dependentComps.onClick = function() {
            if (queuedCount > 1) {
                makeClickHandler("DependentComps", dependentCompsGroup.dependentComps, dcUtil.toBooleanString);
            }
        }
        dependentCompsGroup.firstAndLast.enabled = initUseCompFrameRange && !initSubmitEntireQueue && !initMultiMachine;
        dependentCompsGroup.firstAndLast.onClick = function() {
            makeClickHandler("FirstAndLast", dependentCompsGroup.firstAndLast, dcUtil.toBooleanString);
        }

        // Fail on Warnings functionality + update
        ignoreMissingLayersGroup.failOnWarnings.onClick = function() {
            makeClickHandler("FailOnWarnings", ignoreMissingLayersGroup.failOnWarnings, dcUtil.toBooleanString);
        }

        // Missing layer functionality + update
        ignoreMissingLayersGroup.ignoreMissingLayers.onClick = function() {
            makeClickHandler("MissingLayers", ignoreMissingLayersGroup.ignoreMissingLayers, dcUtil.toBooleanString);
        }

        // Export as XML functionality + update
        ignoreMissingLayersGroup.exportAsXml.onClick = function() {
            makeClickHandler("ExportAsXml", ignoreMissingLayersGroup.exportAsXml, dcUtil.toBooleanString);
        }

        // delete temp xml functionality + update
        ignoreMissingEffectsGroup.deleteTempXml.onClick = function() {
            makeClickHandler("DeleteTempXml", ignoreMissingEffectsGroup.deleteTempXml, dcUtil.toBooleanString);
        }

        // missing footage functionality + update
        ignoreMissingEffectsGroup.missingFootage.onClick = function() {
            if (parseInt(version) > 8) {
                makeClickHandler("MissingFootage", ignoreMissingEffectsGroup.missingFootage, dcUtil.toBooleanString);
            }
        }

        // Missing effects functionality + update
        ignoreMissingEffectsGroup.ignoreMissingEffects.onClick = function() {
            makeClickHandler("MissingEffects", ignoreMissingEffectsGroup.ignoreMissingEffects, dcUtil.toBooleanString);
        }

        submitEntireQueueGroup.multiProcess.onClick = function() {
            makeClickHandler("MultiProcess", submitEntireQueueGroup.multiProcess, dcUtil.toBooleanString);
        }

        submitEntireQueueGroup.submitScene.onClick = function() {
            ignoreMissingEffectsGroup.deleteTempXml.enabled = this.value && ignoreMissingLayersGroup.exportAsXml.value;

            // Update value for SubmitScene in deadlineCloudConfiguration
            makeClickHandler("SubmitScene", submitEntireQueueGroup.submitScene, dcUtil.toBooleanString);
        }

        // Export xml functionality
        ignoreMissingLayersGroup.exportAsXml.onClick = function() {
            ignoreMissingEffectsGroup.deleteTempXml.enabled = this.value && submitEntireQueueGroup.submitScene.value;
        }

        // local rendering functionality + update
        failOnExistingProcessGroup.localRendering.onClick = function() {
            makeClickHandler("LocalRendering", failOnExistingProcessGroup.localRendering, dcUtil.toBooleanString);
        }

        // Fail On Existing AE Process functionality
        failOnExistingProcessGroup.OverrideFailOnExistingAEProcess.onClick = function() {
            failOnExistingProcessGroup.FailOnExistingAEProcess.enabled = this.value;
            makeClickHandler("OverrideFailOnExistingAEProcess", failOnExistingProcessGroup.OverrideFailOnExistingAEProcess, dcUtil.toBooleanString);
        }
        failOnExistingProcessGroup.FailOnExistingAEProcess.onClick = function() {
            makeClickHandler("FailOnExistingAEProcess", failOnExistingProcessGroup.FailOnExistingAEProcess, dcUtil.toBooleanString);
        }

        // Ignore GPU Accel warning functionality + update
        ignoreGPUAccelGroup.ignoreGPUAccelWarning.onClick = function() {
            makeClickHandler("IgnoreGPUAccelWarning", ignoreGPUAccelGroup.ignoreGPUAccelWarning, dcUtil.toBooleanString);
        }

        // Include output path functionality
        ignoreGPUAccelGroup.includeOutputPath.onClick = function() {
            // failOnExistingProcessGroup.localRendering.enabled = this.value && !multiMachineGroup.multiMachine.value;
            failOnExistingProcessGroup.localRendering.enabled = this.value;
            makeClickHandler("IncludeOutputPath", ignoreGPUAccelGroup.includeOutputPath, dcUtil.toBooleanString);
        }

        // Output checking options functionality + Update deadlineCloudConfiguration object
        fileSizeGroup.fileSizeSlider.onChange = function() {
            dcUtil.changeTextValue(fileSizeGroup.fileSizeSlider, fileSizeGroup.fileSize, 0, 10000);
            if (fileSizeGroup.fileSizeSlider.value > 0) {
                fileSizeDeleteFileGroup.fileSizeDeleteFile.enabled = true;
            } else if (fileSizeGroup.fileSizeSlider.value == 0) {
                fileSizeDeleteFileGroup.fileSizeDeleteFile.enabled = false;
            }
            makeClickHandler("FileSize", fileSizeGroup.fileSizeSlider, Math.round);
        }
        fileSizeGroup.fileSize.onChange = function() {
            dcUtil.editTextIntValidation(fileSizeGroup.fileSize, fileSizeGroup.fileSizeSlider);
            dcUtil.changeSliderValue(fileSizeGroup.fileSizeSlider, fileSizeGroup.fileSize, 0, 10000);
            if (fileSizeGroup.fileSizeSlider.value > 0) {
                fileSizeDeleteFileGroup.fileSizeDeleteFile.enabled = true;
            } else if (fileSizeGroup.fileSizeSlider.value == 0) {
                fileSizeDeleteFileGroup.fileSizeDeleteFile.enabled = false;
            }
            makeClickHandler("FileSize", fileSizeGroup.fileSizeSlider, Math.round);
        }

        // Delete Files Under min file size functionality + update deadlineCloudConfiguration object
        fileSizeDeleteFileGroup.fileSizeDeleteFile.onClick = function() {
            makeClickHandler("DeleteFile", fileSizeDeleteFileGroup.fileSizeDeleteFile, dcUtil.toBooleanString);
        }

        // Memory management functionality
        memoryManagementGroup.memoryManagement.onClick = function() {
            imageCachePercentageGroup.imageCachePercentageLabel.enabled = this.value;
            imageCachePercentageGroup.imageCachePercentage.enabled = this.value;
            imageCachePercentageGroup.imageCachePercentageSlider.enabled = this.value;
            maxMemoryPercentageGroup.maxMemoryPercentageLabel.enabled = this.value;
            maxMemoryPercentageGroup.maxMemoryPercentage.enabled = this.value;
            maxMemoryPercentageGroup.maxMemoryPercentageSlider.enabled = this.value;

            // Update MemoryManagement key in deadlineCloudConfigurationObject
            makeClickHandler("MemoryManagement", memoryManagementGroup.memoryManagement, dcUtil.toBooleanString);
        }

        // Image Cache Percentage functionality
        imageCachePercentageGroup.imageCachePercentageSlider.onChange = function() {
            dcUtil.changeTextValue(imageCachePercentageGroup.imageCachePercentageSlider, imageCachePercentageGroup.imageCachePercentage, 20, 100);
            makeClickHandler("ImageCachePercentage", imageCachePercentageGroup.imageCachePercentageSlider, Math.round);
        }
        imageCachePercentageGroup.imageCachePercentage.onChange = function() {
            dcUtil.editTextIntValidation(imageCachePercentageGroup.imageCachePercentage, imageCachePercentageGroup.imageCachePercentageSlider);
            dcUtil.changeSliderValue(imageCachePercentageGroup.imageCachePercentageSlider, imageCachePercentageGroup.imageCachePercentage, 20, 100);
            makeClickHandler("ImageCachePercentage", imageCachePercentageGroup.imageCachePercentageSlider, Math.round);
        }

        // Max Memory Percentage functionality
        maxMemoryPercentageGroup.maxMemoryPercentageSlider.onChange = function() {
            dcUtil.changeTextValue(maxMemoryPercentageGroup.maxMemoryPercentageSlider, maxMemoryPercentageGroup.maxMemoryPercentage, 20, 100);
            makeClickHandler("MaxMemoryPercentage", maxMemoryPercentageGroup.maxMemoryPercentageSlider, Math.round);
        }
        maxMemoryPercentageGroup.maxMemoryPercentage.onChange = function() {
            dcUtil.editTextIntValidation(maxMemoryPercentageGroup.maxMemoryPercentage, maxMemoryPercentageGroup.maxMemoryPercentageSlider);
            dcUtil.changeSliderValue(maxMemoryPercentageGroup.maxMemoryPercentageSlider, maxMemoryPercentageGroup.maxMemoryPercentage, 20, 100);
            makeClickHandler("MaxMemoryPercentage", maxMemoryPercentageGroup.maxMemoryPercentageSlider, Math.round);
        }
    }

    function initConnectionsJobSpecific() {
        var queuedCount = dcAeUtil.getQueuedCompCount();
        logger.log("Initializing Job-Specific Connections", _scriptFileAESubmitterName, LOG_LEVEL.INFO);
        // Project path button functionality
        projPathGroup.projButton.onClick = function() {
            var outFolder = Folder.selectDialog();
            if (outFolder != null)
                projPathGroup.projPathText.text = outFolder.fsName;
        }

        // Output path button functionality
        outputFolderGroup.browseButton.onClick = function() {
            var outFolder = Folder.selectDialog();
            if (outFolder != null)
                outputFolderGroup.outputFolderText.text = outFolder.fsName;
        }
        
        // Frame List functionality
        frameListGroup.frameList.onChange = function()
        {
            var text = frameListGroup.frameList.text;
            var filteredText = text.replace(/[^0-9,\-]/g, '');
            if(text !== filteredText)
            {
                frameListGroup.frameList.text = filteredText;
            }
        }

        frameListGroup.frameListLabel.enabled = !initSubmitEntireQueue && !initMultiMachine;
        frameListGroup.frameList.enabled = !initUseCompFrameRange && !initSubmitEntireQueue && !initMultiMachine;
        frameListGroup.useCompFrameList.enabled = !initSubmitEntireQueue && !initMultiMachine;
        frameListGroup.useCompFrameList.onClick = function() {
            frameListGroup.frameList.enabled = !this.value;
            dependentCompsGroup.firstAndLast.enabled = this.value;
            makeClickHandler("UseCompFrame", frameListGroup.useCompFrameList, dcUtil.toBooleanString);
        }

        compSubmissions = new Array(3);
        compSubmissions[0] = selectOne;
        compSubmissions[1] = useQueue;
        compSubmissions[2] = allQueueSep;

        for (var i = 0; i < compSubmissions.length; i++) {
            compSubmissionGroup.compSubmission.add('item', compSubmissions[i]);
        }
        compSubmissionGroup.compSubmission.selection = 2;

        // Comp selection functionality (if Select One)
        for (var i = 1; i <= app.project.renderQueue.numItems; i++) {
            var item = compSelectionGroup.compSelection.add('item', app.project.renderQueue.item(i).comp.name);
            if (i === 1 || item.toString() === initCompSelection) {
                compSelectionGroup.compSelection.selection = item;
            }
        }
        // compSubmission must appear on top of compSelection and dependencies, but compSelection and dependencies must be defined for compSubmission's onChange to be implemented
        compSubmissionGroup.compSubmission.onChange = function() {
            var submissionText = compSubmissionGroup.compSubmission.selection.toString();
            compSelectionGroup.compSelection.enabled = (this.enabled && submissionText == selectOne);
            compSelectionGroup.compSelectionLabel.enabled = (this.enabled && submissionText == selectOne);
            dependentCompsGroup.dependentComps.enabled = (this.enabled && ((totalCount > 1 && submissionText == allQueueSep) || (queuedCount > 1 && submissionText == useQueue)));
            if (compSubmissionGroup.compSubmission.selection != null) {
                deadlineCloudConfiguration["CompSubmissionType"] = compSubmissionGroup.compSubmission.selection.toString();
                logger.log("Set " + "CompSubmissionType" + " to " + compSubmissionGroup.compSubmission.selection.toString(), _scriptFileAESubmitterName, LOG_LEVEL.DEBUG);
            }
        }

        for (var i = 0; i < compSubmissionGroup.compSubmission.items.length; i++) {
            item = compSubmissionGroup.compSubmission.items[i];
            if (i === 1 || item.toString() === initCompSubmissionType) {
                compSubmissionGroup.compSubmission.selection = item;
                submissionText = compSubmissionGroup.compSubmission.selection.toString();
            }
        }

        compSelectionGroup.compSelection.onChange = function() {
            if (compSelectionGroup.compSelection.selection != null) {
                deadlineCloudConfiguration["CompSelection"] = compSelectionGroup.compSelection.selection.toString();
                logger.log("Set " + "CompSelection" + " to " + compSelectionGroup.compSelection.selection.toString(), _scriptFileAESubmitterName, LOG_LEVEL.DEBUG);
            }
        }
    }

    function initConnectionsJobAttachment() {

        logger.log("Initializing Job Attachment Connections", _scriptFileAESubmitterName, LOG_LEVEL.INFO);
        // Auto Detect Footage Checkbox
        listButtonsGroup.autoDetectCheckbox.onClick = function()
        {
            if(listButtonsGroup.autoDetectCheckbox.value == true)
            {
                dcInitData.initAutoDetectFootageItems();
                autoDetectFootageItems();
            }
            else
            {
                removeAutoDetectedItemsFromListBox(listButtonsGroup.itemLabels, dcProperties.jobAttachments.autoDetectedInputFiles.get(), listBoxGroup.attachFilesListBox, dcProperties.footageLabels.AUTO_DETECTED_FOOTAGE_ITEMS.get(), dcProperties.footageLabels.ADDED_FOOTAGE_ITEMS.get(), dcProperties.footageLabels.SELECTED_FOOTAGE_ITEMS.get());
            }
            
        }

        // Auto Detect Output Checkbox
        outputDirectoriesListButtonsGroup.autoDetectCheckBox.onClick = function()
        {
            if(outputDirectoriesListButtonsGroup.autoDetectCheckBox.value == true)
            {
                dcInitData.initAutoDetectOutputDirectories();
                autoDetectOutputItems();
            }
            else
            {
                removeAutoDetectedItemsFromListBox(outputDirectoriesListButtonsGroup.itemLabels, dcProperties.jobAttachments.autoDetectOutputDirectories.get(), outputDirectoriesListBoxGroup.attachOutputListBox, dcProperties.outputLabels.AUTO_DETECTED_OUTPUT_ITEMS.get(), dcProperties.outputLabels.ADDED_OUTPUT_ITEMS.get(), dcProperties.outputLabels.SELECTED_OUTPUT_ITEMS.get());
            }
        }  
        // Add Button files
        listButtonsGroup.addFileButton.onClick = function() {
            var file = File.openDialog("Select a file", "All Files:*.*", false);
            // Check if a file was selected
            if (file) {
                var itemCount = 0;

                // Check if item is already in the list.
                if (dcProperties.jobAttachments.userAddedInputFiles.get().indexOf(file.fsName) !== -1 || dcProperties.jobAttachments.autoDetectedInputFiles.get().indexOf(file.fsName) !== -1 ) {
                    alert("The item is already available in the list.")
                    logger.debug("File is already in the list: " + file.fsName, _scriptFileAESubmitterName);
                    return;
                }
                dcProperties.jobAttachments.userAddedInputFiles.get().push(file.fsName);
                listBoxGroup.attachFilesListBox.add("item", file.fsName);
                logger.debug("Added " + file.fsName + " to footage list", _scriptFileAESubmitterName);
            }
            dcProperties.footageLabels.ADDED_FOOTAGE_ITEMS.set(dcProperties.footageLabels.ADDED_FOOTAGE_ITEMS.get() + 1);
            updateNumberItemsLabel(listButtonsGroup.itemLabels, listBoxGroup.attachFilesListBox, dcProperties.footageLabels.AUTO_DETECTED_FOOTAGE_ITEMS.get(), dcProperties.footageLabels.ADDED_FOOTAGE_ITEMS.get(), dcProperties.footageLabels.SELECTED_FOOTAGE_ITEMS.get());
        }

        // Add button input
        directoriesListButtonsGroup.addFileButton.onClick = function()
        {
            var selectedFolder = Folder.selectDialog("Select an input directory to add");
            if(selectedFolder == null)
            {
                logger.debug("No folder was selected.", _scriptFileAESubmitterName);
            }
            else{
                if(dcProperties.jobAttachments.userAddedInputDirectories.get().indexOf(selectedFolder.fsName) !== -1)
                {
                    alert("This item is already available in the list.")
                    logger.debug("File is already in the list: " + selectedFolder.fsName, _scriptFileAESubmitterName);
                    return;
                }
                dcProperties.jobAttachments.userAddedInputDirectories.get().push(selectedFolder.fsName);
                directoriesListBoxGroup.attachInputListBox.add("item", selectedFolder.fsName);
                logger.debug("Added " + selectedFolder.fsName + " to output list", _scriptFileAESubmitterName);
            }
            dcProperties.inputLabels.ADDED_INPUT_ITEMS.set(dcProperties.inputLabels.ADDED_INPUT_ITEMS.get() + 1);
            updateNumberItemsLabel(directoriesListButtonsGroup.itemLabels, directoriesListBoxGroup.attachInputListBox, dcProperties.inputLabels.AUTO_DETECTED_INPUT_ITEMS.get(), dcProperties.inputLabels.ADDED_INPUT_ITEMS.get(), dcProperties.inputLabels.SELECTED_INPUT_ITEMS.get());
        }

        // Add button output
        outputDirectoriesListButtonsGroup.addFileButton.onClick = function () {
            // Use the File.openDialog() method with openDlgParam
            var selectedFolder = Folder.selectDialog("Select an output directory to add");
            if(selectedFolder == null)
            {
                logger.debug("No folder was selected.", _scriptFileAESubmitterName);
            }

            else{
                // Check if a directory was selected
                if (selectedFolder) {
                    // check if output directory is already in the list.
                    if(dcProperties.jobAttachments.userAddedOutputDirectories.get().indexOf(selectedFolder.fsName) !== -1 || dcProperties.jobAttachments.autoDetectOutputDirectories.get().indexOf(selectedFolder.fsName) !== -1 )
                    {
                        alert("The item is already available in the list.")
                        logger.debug("File is already in the list: " + selectedFolder.fsName, _scriptFileAESubmitterName);
                        return;
                    }
                    dcProperties.jobAttachments.userAddedOutputDirectories.get().push(selectedFolder.fsName);
                    outputDirectoriesListBoxGroup.attachOutputListBox.add("item", selectedFolder.fsName);
                    logger.debug("Added " + selectedFolder.fsName + " to output list", _scriptFileAESubmitterName);
                }
                dcProperties.outputLabels.ADDED_OUTPUT_ITEMS.set(dcProperties.outputLabels.ADDED_OUTPUT_ITEMS.get() + 1);;
                updateNumberItemsLabel(outputDirectoriesListButtonsGroup.itemLabels, outputDirectoriesListBoxGroup.attachOutputListBox, dcProperties.outputLabels.AUTO_DETECTED_OUTPUT_ITEMS.get(), dcProperties.outputLabels.ADDED_OUTPUT_ITEMS.get(), dcProperties.outputLabels.SELECTED_OUTPUT_ITEMS.get());
            }
        };

        // Remove button files
        listButtonsGroup.removeFileButton.onClick = function()
        {
            removeItemButtonFunctionality (listButtonsGroup.itemLabels, dcProperties.jobAttachments.autoDetectedInputFiles.get(), listBoxGroup.attachFilesListBox, dcProperties.jobAttachments.userAddedInputFiles.get(), dcProperties.footageLabels.AUTO_DETECTED_FOOTAGE_ITEMS.get(), dcProperties.footageLabels.ADDED_FOOTAGE_ITEMS.get(), dcProperties.footageLabels.SELECTED_FOOTAGE_ITEMS.get());
        }
        // Remove button input
        directoriesListButtonsGroup.removeFileButton.onClick = function()
        {
            removeItemButtonFunctionality (directoriesListButtonsGroup.itemLabels, dcProperties.jobAttachments.autoDetectInputDirectories.get(), directoriesListBoxGroup.attachInputListBox, dcProperties.jobAttachments.userAddedInputDirectories.get(), dcProperties.inputLabels.AUTO_DETECTED_INPUT_ITEMS.get(), dcProperties.inputLabels.ADDED_INPUT_ITEMS.get(), dcProperties.inputLabels.SELECTED_INPUT_ITEMS.get()); 
        }
        // Remove button output
        outputDirectoriesListButtonsGroup.removeFileButton.onClick = function()
        {
            removeItemButtonFunctionality (outputDirectoriesListButtonsGroup.itemLabels, dcProperties.jobAttachments.autoDetectOutputDirectories.get(), outputDirectoriesListBoxGroup.attachOutputListBox, dcProperties.jobAttachments.userAddedOutputDirectories.get(), dcProperties.outputLabels.AUTO_DETECTED_OUTPUT_ITEMS.get(), dcProperties.outputLabels.ADDED_OUTPUT_ITEMS.get(), dcProperties.outputLabels.SELECTED_OUTPUT_ITEMS.get());
        }

        // When selection changes in listbox, update the label showcasing the amount.
        listBoxGroup.attachFilesListBox.onChange = function() {
            if(listButtonsGroup.autoDetectCheckbox.value == false)
            {
                //dcProperties.footageLabels.AUTO_DETECTED_FOOTAGE_ITEMS.set(0);
                dcProperties.footageLabels.ADDED_FOOTAGE_ITEMS.set(listBoxGroup.attachFilesListBox.items.length);
            }

            updateNumberItemsLabel(listButtonsGroup.itemLabels, listBoxGroup.attachFilesListBox, dcProperties.footageLabels.AUTO_DETECTED_FOOTAGE_ITEMS.get(), dcProperties.footageLabels.ADDED_FOOTAGE_ITEMS.get(), dcProperties.footageLabels.SELECTED_FOOTAGE_ITEMS.get());
        }

        // When selection changes in listbox, update the label showcasing the amount.
        directoriesListBoxGroup.attachInputListBox.onChange = function()
        {
            updateNumberItemsLabel(directoriesListButtonsGroup.itemLabels, directoriesListBoxGroup.attachInputListBox, dcProperties.inputLabels.AUTO_DETECTED_INPUT_ITEMS.get(), dcProperties.inputLabels.ADDED_INPUT_ITEMS.get(), dcProperties.inputLabels.SELECTED_INPUT_ITEMS.get());
        }

        // When selection changes in listbox, update the label showcasing the amount.
        outputDirectoriesListBoxGroup.attachOutputListBox.onChange = function()
        {
            updateNumberItemsLabel(outputDirectoriesListButtonsGroup.itemLabels, outputDirectoriesListBoxGroup.attachOutputListBox, dcProperties.outputLabels.AUTO_DETECTED_OUTPUT_ITEMS.get(), dcProperties.outputLabels.ADDED_OUTPUT_ITEMS.get(), dcProperties.outputLabels.SELECTED_OUTPUT_ITEMS.get());
        }
    }

    function initConnectionsHostRequirements() {
        logger.info("Initializing Host Requirements Connections", _scriptFileAESubmitterName);
        // Enable and disable panels based on what worker selection checkbox is set to true
        runGroup.runAllWorkersCheckBox.onClick = function() {
            runGroup.runRequirementHostCheckBox.value = !runGroup.runAllWorkersCheckBox.value;
            deadlineCloud.osPanel.enabled = !runGroup.runAllWorkersCheckBox.value;
            deadlineCloud.hardwarePanel.enabled = !runGroup.runAllWorkersCheckBox.value;
            deadlineCloud.customHostRequirementPanel.enabled = !runGroup.runAllWorkersCheckBox.value;
        }

        runGroup.runRequirementHostCheckBox.onClick = function() {
            runGroup.runAllWorkersCheckBox.value = !runGroup.runRequirementHostCheckBox.value
            deadlineCloud.osPanel.enabled = runGroup.runRequirementHostCheckBox.value;
            deadlineCloud.hardwarePanel.enabled = runGroup.runRequirementHostCheckBox.value;
            deadlineCloud.customHostRequirementPanel.enabled = runGroup.runRequirementHostCheckBox.value;
        }

        // When Min and Max values are set, do not allow any characters but numbers(0-9)
        // Do not allow min to be higher than max value, and max value to be lower than min value
        cpuGroup.cpuMinText.onChange = function() {
            dcUtil.spinBoxLimiterMin(cpuGroup.cpuMinText, cpuGroup.cpuMaxText);
        }

        cpuGroup.cpuMaxText.onChange = function() {
            dcUtil.spinBoxLimiterMax(cpuGroup.cpuMinText, cpuGroup.cpuMaxText);
        }

        memoryGroup.memoryMinText.onChange = function() {
            dcUtil.spinBoxLimiterMin(memoryGroup.memoryMinText, memoryGroup.memoryMaxText);
        }

        memoryGroup.memoryMaxText.onChange = function() {
            dcUtil.spinBoxLimiterMax(memoryGroup.memoryMinText, memoryGroup.memoryMaxText);
        }

        gpuGroup.gpuMinText.onChange = function() {
            dcUtil.spinBoxLimiterMin(gpuGroup.gpuMinText, gpuGroup.gpuMaxText);
        }

        gpuGroup.gpuMaxText.onChange = function() {
            dcUtil.spinBoxLimiterMax(gpuGroup.gpuMinText, gpuGroup.gpuMaxText);
        }

        gpuMemoryGroup.gpuMemoryMinText.onChange = function() {
            dcUtil.spinBoxLimiterMin(gpuMemoryGroup.gpuMemoryMinText, gpuMemoryGroup.gpuMemoryMaxText);
        }

        gpuMemoryGroup.gpuMemoryMaxText.onChange = function() {
            dcUtil.spinBoxLimiterMax(gpuMemoryGroup.gpuMemoryMinText, gpuMemoryGroup.gpuMemoryMaxText);
        }

        scratchSpaceGroup.scratchSpaceMinText.onChange = function() {
            dcUtil.spinBoxLimiterMin(scratchSpaceGroup.scratchSpaceMinText, scratchSpaceGroup.scratchSpaceMaxText);
        }

        scratchSpaceGroup.scratchSpaceMaxText.onChange = function() {
            dcUtil.spinBoxLimiterMax(scratchSpaceGroup.scratchSpaceMinText, scratchSpaceGroup.scratchSpaceMaxText);
        }
    }

    // ----- LISTENER CALLBACKS -----
    function initCallbacks(){
        /**
        * Initialize all property callbacks. 
        * 
        * This is called before data is initialized.
        */
        dcProperties.isAPIAvailable.add_listener(onIsApiAvailableChanged);
        dcProperties.isLoggedIn.add_listener(onIsLoggedInChangedMainUI);
        dcProperties.isWindowClosed.add_listener(onIsWindowClosed);
    }

    function onIsLoggedInChangedMainUI(newValue, oldValue){

        dcInitData.initDeadlineConfig();
        // Early exit if state is unchanged.
        if(newValue == oldValue){
            return;
        }

        // Logged in
        if(newValue){
            var _loginWindow = dcInitData.loadingLoginWindow();
            _loginWindow.text = "Logging in to Deadline Cloud Monitor."
            _loginWindow.children[0].text = "Logging in to Deadline Cloud Monitor."
            _loginWindow.update();
            if(dcProperties.farmList.get().length == 0)
            {
                dcInitData.initDeadlineFarmData();
            }
            // Fill farm and queue list again. When we startup and we are logged out the lists are empty
            var result = dcDeadlineCommands.credentialStatus(dcProperties.config.aws_profile.get());
            dcProperties.credentialStatus.source.set(result.source);
            dcProperties.credentialStatus.status.set(result.status);
            dcProperties.credentialStatus.api.set(result.api);
            credsAuthentication.text = dcProperties.credentialStatus.source.get();
            credsAuthentication.graphics.foregroundColor = green;
            if(result.source == "NOT_VALID")
            {
                credsAuthentication.graphics.foregroundColor = red;
            }

            statusAuthentication.text = dcProperties.credentialStatus.status.get();
            statusAuthentication.graphics.foregroundColor = red;
            if(result.status == "AUTHENTICATED")
            {
                statusAuthentication.graphics.foregroundColor = green;
            }

            dcProperties.isAPIAvailable.set(dcProperties.credentialStatus.api.get());

            // enabled submit buttons
            buttonsGroup.submitLayersButton.enabled = true;
            buttonsGroup.submitButton.enabled = true;

            // Set default farm and queue based on if a match of the config found farm_id and queue_id is found
            var farmMatch = dcUtil.getMatchName("Farm", dcProperties.config.farm_id.get());
            var queueMatch = dcUtil.getMatchName("Queue", dcProperties.config.queue_id.get());
            if(farmMatch.match == true)
            {
                farmTimeGroup.farmTimeLabel.text = "Farm: " + farmMatch.keyName;
            }
            else if (farmMatch.match == null)
            {
                alert("No default farm found in console.");
            }
            if(queueMatch.match == true)
            {
                queueGroup.qLabel.text = "Queue: " + queueMatch.keyName;
            }
            else if (queueMatch.match == null)
            {
                alert("No default farm found in console.");
            }
            _loginWindow.close();
            return;
        }
        var _logoutWindow = dcInitData.loadingLoginWindow();
        _logoutWindow.text = "Logging out of Deadline Cloud Monitor."
        _logoutWindow.children[0].text = "Logging out of Deadline Cloud Monitor."
        _logoutWindow.update();
        // Logged out
        dcProperties.farmList.set([]);
        dcProperties.queueList.set([]);
        // disabled submit buttons
        buttonsGroup.submitLayersButton.enabled = false;
        buttonsGroup.submitButton.enabled = false;
        var result = dcDeadlineCommands.credentialStatus(dcProperties.config.aws_profile.get());
        dcProperties.credentialStatus.source.set(result.source);
        dcProperties.credentialStatus.status.set(result.status);
        dcProperties.credentialStatus.api.set(result.api);
        credsAuthentication.text = dcProperties.credentialStatus.source.get();
        credsAuthentication.graphics.foregroundColor = green;
        if(result.source == "NOT_VALID")
        {
            credsAuthentication.graphics.foregroundColor = red;
        }

        statusAuthentication.text = dcProperties.credentialStatus.status.get();
        statusAuthentication.graphics.foregroundColor = red;
        if(result.status == "AUTHENTICATED")
        {
            statusAuthentication.graphics.foregroundColor = green;
        }
        dcProperties.isAPIAvailable.set(dcProperties.credentialStatus.api.get());

        farmTimeGroup.farmTimeLabel.text = "Farm: " + dcProperties.config.farm_id.get();
        queueGroup.qLabel.text = "Queue: " + dcProperties.config.queue_id.get();
        dcProperties.isAPIAvailable.set(false);
        _logoutWindow.close();
    }

    function onIsApiAvailableChanged(newValue, oldValue)
    {
         // Early exit if state is unchanged.
        if(newValue == oldValue){
            return;
        }
        // Logged in
        if(newValue){
            apiAuthentication.text = 'True';
            apiAuthentication.graphics.foregroundColor = green;
            return;
        }
        // Logged out
        apiAuthentication.text = "False";
        apiAuthentication.graphics.foregroundColor = red;
    }

    function onIsWindowClosed(newValue, oldValue)
    {
        if(newValue == false)
        {
            deadlineCloud.aeSubmitterUI.enabled = true;
            if(dcProperties.isLoggedIn.get())
            {
                buttonsGroup.submitLayersButton.enabled = true;
                buttonsGroup.submitButton.enabled = true;
            }
            else
            {
                buttonsGroup.submitLayersButton.enabled = false;
                buttonsGroup.submitButton.enabled = false;
            }
        }
        return;
    }
    // ----- /LISTENER CALLBACKS -----
    
    function exportBundleToJobHistoryDir(renderQueueItem, job_history_dir, itemName)
    {
        /**
         * Export the entire renderQueue or only the selected comp as a bundle.
         */
        var __template = {};
        if(compSubmissionGroup.compSubmission.selection.toString() == useQueue)
        {
            __template = dcSubmitButton.createDataAndParameterTemplateOneJob();
        }
        else{
            __template = dcSubmitButton.createDataAndParameterTemplateSeparateJobs(renderQueueItem, itemName);
        }
        // 3. Create asset reference dict
        jobAssetReferences = dcSubmitButton.generateAssetReferences();
        
        // Create folder at correct job history location
        var exportDir = dcUtil.createExportBundleDir(job_history_dir, jobGroup.jobName.text);
        createBundle(exportDir, __template.jobTemplate, __template.jobParams, jobAssetReferences);
        // Open the created folder
        var os = $.os.toLowerCase();
        if (os.indexOf("win") !== -1) {
            // Windows
            system.callSystem('explorer.exe "' + exportDir + '"');
        } else if (os.indexOf("mac") !== -1) {
            // macOS
            system.callSystem('open "' + exportDir + '"');
        }
    }

    function removeItemButtonFunctionality(labelName, autoDetectedList, listbox, itemList, numberAutoDetected, numberInListBox, numberSelected)
    {
        var selectedItemsArray = listbox.selection;

        if (!selectedItemsArray) {
            alert("Please select an item to delete.");
            return;
        }

        for (var i = 0; i < selectedItemsArray.length; i++) {
            logger.debug("Selected Item: " + selectedItemsArray[i].text, _scriptFileAESubmitterName);

            var selectedItem = selectedItemsArray[i].text;
            if (autoDetectedList.indexOf(selectedItem) !== -1) {
                alert("Selected item is part of the auto detected footage. Cannot be deleted.");
                continue;
            }
            logger.debug("Deleted Item: " + selectedItemsArray[i].text, _scriptFileAESubmitterName);
            listbox.remove(selectedItemsArray[i]);
            var itemIndex = itemList.indexOf(selectedItem);
            var removedItem = itemList.splice(itemIndex, 1);
            if(autoDetectedList == dcProperties.jobAttachments.autoDetectedInputFiles.get())
            {
                dcProperties.footageLabels.ADDED_FOOTAGE_ITEMS.set(dcProperties.footageLabels.ADDED_FOOTAGE_ITEMS.get() - 1);
            }
            else if(autoDetectedList == dcProperties.jobAttachments.autoDetectOutputDirectories.get())
            {
                dcProperties.outputLabels.ADDED_OUTPUT_ITEMS.set(dcProperties.outputLabels.ADDED_OUTPUT_ITEMS.get() - 1);
            }
            else{
                dcProperties.inputLabels.ADDED_INPUT_ITEMS.set(dcProperties.inputLabels.ADDED_INPUT_ITEMS.get() - 1);
            }
        }

        if(autoDetectedList == dcProperties.jobAttachments.autoDetectedInputFiles.get())
        {
            logger.debug(dcProperties.footageLabels.ADDED_FOOTAGE_ITEMS.get(), _scriptFileAESubmitterName);
            updateNumberItemsLabel(labelName, listbox, numberAutoDetected, dcProperties.footageLabels.ADDED_FOOTAGE_ITEMS.get(), numberSelected);
        }
        else if(autoDetectedList == dcProperties.jobAttachments.autoDetectOutputDirectories.get())
        {
            logger.debug(dcProperties.outputLabels.ADDED_OUTPUT_ITEMS.get(), _scriptFileAESubmitterName);
            updateNumberItemsLabel(labelName, listbox, numberAutoDetected, dcProperties.outputLabels.ADDED_OUTPUT_ITEMS.get(), numberSelected);
        }
        else{
            logger.debug(dcProperties.inputLabels.ADDED_INPUT_ITEMS.get(), _scriptFileAESubmitterName);
            updateNumberItemsLabel(labelName, listbox, numberAutoDetected, dcProperties.inputLabels.ADDED_INPUT_ITEMS.get(), numberSelected);
        }
    }

    function updateNumberItemsLabel(labelName, listBox, numberAutoDetected, numberInListBox, numberSelected) {
        var items = listBox.selection;
        numberSelected = 0;
        if (items !== null) {
            numberSelected = items.length;
        }

        labelName.text = numberAutoDetected + " auto, " + numberInListBox + " added, " + numberSelected + " selected";
    }

    function autoDetectFootageItems()
    {
        for(item in dcProperties.jobAttachments.autoDetectedInputFiles.get())
        {
            // Check if parseInt returns NaN. For some reason getting the directories also returns functions like every, forEach, reduce, lastIndexOf, etc.
            if(isNaN(parseInt(item)))
            {
                continue;
            }
            listBoxGroup.attachFilesListBox.add("item", dcProperties.jobAttachments.autoDetectedInputFiles.get()[item]);
        }
        dcProperties.footageLabels.AUTO_DETECTED_FOOTAGE_ITEMS.set(dcProperties.jobAttachments.autoDetectedInputFiles.get().length);
        updateNumberItemsLabel(listButtonsGroup.itemLabels, listBoxGroup.attachFilesListBox, dcProperties.footageLabels.AUTO_DETECTED_FOOTAGE_ITEMS.get(), dcProperties.footageLabels.ADDED_FOOTAGE_ITEMS.get(), dcProperties.footageLabels.SELECTED_FOOTAGE_ITEMS.get());
    }
    
    function autoDetectOutputItems()
    {
        // Fill global list with available output directories from the renderqueue items.
        // If the items already exist in the global list, do not add them to the listbox
        // If the items do not already exist in the global list, add them to the global list and the listbox.

        // Check if parseInt returns NaN. For some reason getting the directories also returns functions like every, forEach, reduce, lastIndexOf, etc.
        dcProperties.outputLabels.AUTO_DETECTED_OUTPUT_ITEMS.set(0);
        for (item in dcProperties.jobAttachments.autoDetectOutputDirectories.get())
        {
            if(isNaN(parseInt(item)))
            {
                continue;
            }
            outputDirectoriesListBoxGroup.attachOutputListBox.add("item", dcProperties.jobAttachments.autoDetectOutputDirectories.get()[item]);
        }
        dcProperties.outputLabels.AUTO_DETECTED_OUTPUT_ITEMS.set(dcProperties.jobAttachments.autoDetectOutputDirectories.get().length);
        updateNumberItemsLabel(outputDirectoriesListButtonsGroup.itemLabels, outputDirectoriesListBoxGroup.attachOutputListBox, dcProperties.outputLabels.AUTO_DETECTED_OUTPUT_ITEMS.get(), dcProperties.outputLabels.ADDED_OUTPUT_ITEMS.get(), dcProperties.outputLabels.SELECTED_OUTPUT_ITEMS.get());
    }

    function removeAutoDetectedItemsFromListBox(labelName, autoDetectedList, listbox, numberAutoDetected, numberInListBox, numberSelected)
    {
        // Loop over auto detected footage list and see if they are available in the listbox, if so remove them from the listbox.
        for (var i =0; i < autoDetectedList.length; i++)
        {
            var currItem = autoDetectedList[i];
            logger.debug(currItem, _scriptFileAESubmitterName);
            // Check if item is in listbox
            for(var j = 0; j < listbox.items.length; j++)
            {
                if(listbox.items[j].text === currItem)
                {
                    listbox.remove(j);
                }
            }
        }
        numberSelected = 0;
        listbox.selection = null;
        labelName.text = numberAutoDetected + " auto, " + numberInListBox + " added, " + numberSelected + " selected";
    }

    function makeClickHandler(paramName, sourceElement, typeToStrFunction) {
        function handler() {
            var paramAsStr = typeToStrFunction(sourceElement.value);
            deadlineCloudConfiguration[paramName] = paramAsStr;
            logger.log("Set " + paramName + " to " + paramAsStr, _scriptFileAESubmitterName, LOG_LEVEL.DEBUG);
        }
        return handler();
    }

    return {
            "createUI": createUI
    }
}
dcSubmitterUi = __generateSubmitterUI();




var deadlineCloudSubmitLayers = {};
var renderQueueDuplicateBool = false;

function __generateSubmitLayerButton() {
    //get the saved defaults from the ini file
    var initPreserveCam = dcUtil.parseBool(dcSettings.getIniSetting("Layers_PreserveCamera", "true"));
    var initPreserveLights = dcUtil.parseBool(dcSettings.getIniSetting("Layers_PreserveLights", "true"));
    var initPreserveAdjustments = dcUtil.parseBool(dcSettings.getIniSetting("Layers_PreserveAdjustments", "true"));
    var initPreserveAV = dcUtil.parseBool(dcSettings.getIniSetting("Layers_PreserveAV", "true"));
    var initPreserveUnselected = dcUtil.parseBool(dcSettings.getIniSetting("Layers_PreserveUnselected", "true"));
    var initRenderSettings = dcSettings.getIniSetting("Layers_RenderSettings", "");
    var initOutputModule = dcSettings.getIniSetting("Layers_OutputModule", "");
    var initOutputFolder = dcSettings.getIniSetting("Layers_OutputFolder", "");
    var initOutputFormat = dcSettings.getIniSetting("Layers_OutputFormat", "[compName]_[layerName]");
    var initUseSubfolders = dcUtil.parseBool(dcSettings.getIniSetting("Layers_UseSubfolders", "false"));
    var initSubfolderFormat = dcSettings.getIniSetting("Layers_SubfolderFormat", "[layerName]");
    var initLayerNameParse = dcSettings.getIniSetting("Layers_NameParsing", "");

    var LAYER_CHECKBOX_SIZE = [180, 20];
    var SUBMIT_LAYER_LABEL_SIZE = [120, 20];
    var LAYER_TEXT_SIZE = [300, 20];
    var LAYER_BROWSE_TEXT_SIZE = [250, 20];
    var LAYER_BUTTON_SIZE = [36, 20];
    var LAYER_COMBO_SIZE = [300, 20];

    // Create file name for logger
    var _scriptFileSubmitLayersName = "SubmitLayersWindow.jsx";

    function SubmitLayersToDeadline() {
        /**
         * Opens window that enables user to set specific settings for selected layers only.
         * Afterwards submit selected layers to Deadline Cloud for rendering.
         */
        // Init called inside alerts if all checks pass
        logger.info("Submitting Layers to Deadline Pressed", _scriptFileSubmitLayersName);
        initAlerts();
    }

    function initAlerts() {
        /**
         * Push alerts to after effects base on activeItem
         */
        logger.log("Initializing Submit Layer Alerts", _scriptFileSubmitLayersName, LOG_LEVEL.INFO);
        var activeComp = app.project.activeItem;

        if (!(activeComp instanceof CompItem || activeComp instanceof AVLayer)) {
            alert("You do not have a composition selected. Please select a composition and layers first.");
        } else if (activeComp.selectedLayers.length == 0) {
            alert("You do not have any selected layers in the active composition!");
        } else {
            for (i = 1; i <= app.project.renderQueue.numItems; ++i) {
                if (activeComp == app.project.renderQueue.item(i).comp && app.project.renderQueue.item(i).status == RQItemStatus.QUEUED) {
                    alert("The active comp is already in the render queue and is set to render. Please remove the comp from the render queue.");
                    return;
                }
            }
            // CALL INIT
            initSubmitLayers();
            deadlineCloudSubmitLayers.layersDialog.show();
        }
    }

    function initSubmitLayers() {
        /**
         * Initialize all widgets
         */

        logger.log("Initializing Submit Layer Window", _scriptFileSubmitLayersName, LOG_LEVEL.INFO);
        // Create main window
        deadlineCloudSubmitLayers.layersDialog = new Window('dialog', 'Submit Selected Layers to Deadline');

        // Create description group, and label
        descriptionGroupSettings = deadlineCloudSubmitLayers.layersDialog.add('group', undefined);
        descriptionGroupSettings.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        descriptionGroupSettings.descriptionLabel = descriptionGroupSettings.add('statictext', undefined, 'This will submit all selected layers to Deadline as separate Jobs. Settings set in the submission dialog will be used, but comps currently in the render queue will NOT be submitted by this dialog.', {
            multiline: true
        });
        descriptionGroupSettings.descriptionLabel.size = [400, 45];

        // Create preservation panel, group, and widgets(if enabled, these layers will be rendered with each of the selected layers)
        deadlineCloudSubmitLayers.preservePanel = deadlineCloudSubmitLayers.layersDialog.add('panel', undefined, 'Choose Unselected Layers To Include In The Render');
        deadlineCloudSubmitLayers.preservePanel.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];

        preserveUnselectedGroup = deadlineCloudSubmitLayers.preservePanel.add('group', undefined);
        preserveUnselectedGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        preserveUnselectedGroup.preserveUnselected = preserveUnselectedGroup.add('checkbox', undefined, 'All Unselected Layers');
        preserveUnselectedGroup.preserveUnselected.value = initPreserveUnselected;
        preserveUnselectedGroup.preserveUnselected.size = LAYER_CHECKBOX_SIZE;
        preserveUnselectedGroup.preserveUnselected.helpTip = 'Render all unselected layers with each of the selected layers.';

        preserveCameraGroup = deadlineCloudSubmitLayers.preservePanel.add('group', undefined);
        preserveCameraGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        preserveCameraGroup.orientation = "row";
        preserveCameraGroup.preserveCamera = preserveCameraGroup.add('checkbox', undefined, 'Topmost Camera Layer');
        preserveCameraGroup.preserveCamera.value = initPreserveCam;
        preserveCameraGroup.preserveCamera.enabled = !initPreserveUnselected;
        preserveCameraGroup.preserveCamera.size = LAYER_CHECKBOX_SIZE;
        preserveCameraGroup.preserveCamera.helpTip = 'Render the topmost camera layer with each of the selected layers.';
        preserveCameraGroup.preserveLights = preserveCameraGroup.add('checkbox', undefined, 'Light Layers');
        preserveCameraGroup.preserveLights.value = initPreserveLights;
        preserveCameraGroup.preserveLights.enabled = !initPreserveUnselected;
        preserveCameraGroup.preserveLights.size = LAYER_CHECKBOX_SIZE;
        preserveCameraGroup.preserveLights.helpTip = 'Render the light layers with each of the selected layers.';

        preserveAVGroup = deadlineCloudSubmitLayers.preservePanel.add('group', undefined);
        preserveAVGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        preserveAVGroup.orientation = "row";
        preserveAVGroup.preserveAV = preserveAVGroup.add('checkbox', [20, 30, 210, 50], 'Audio/Video Layers');
        preserveAVGroup.preserveAV.value = initPreserveAV;
        preserveAVGroup.preserveAV.enabled = !initPreserveUnselected;
        preserveAVGroup.preserveAV.size = LAYER_CHECKBOX_SIZE;
        preserveAVGroup.preserveAV.helpTip = 'Render the Audio/Video layers with each of the selected layers.';
        preserveAVGroup.preserveAdjustments = preserveAVGroup.add('checkbox', [210, 30, 370, 50], 'Adjustment Layers');
        preserveAVGroup.preserveAdjustments.value = initPreserveAdjustments;
        preserveAVGroup.preserveAdjustments.enabled = !initPreserveUnselected;
        preserveAVGroup.preserveAdjustments.size = LAYER_CHECKBOX_SIZE;
        preserveAVGroup.preserveAdjustments.helpTip = 'Render the Adjustment layers with each of the selected layers.';

        // Create options panel, group, and widgets
        deadlineCloudSubmitLayers.optionalPanel = deadlineCloudSubmitLayers.layersDialog.add('panel', undefined, 'Optional Settings');
        parseLayerNamesGroup = deadlineCloudSubmitLayers.optionalPanel.add('group', undefined);
        parseLayerNamesGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        parseLayerNamesGroup.orientation = "row";
        parseLayerNamesGroup.parseLayerNamesLabel = parseLayerNamesGroup.add('statictext', undefined, 'Layer Name Parsing')
        parseLayerNamesGroup.parseLayerNamesLabel.size = SUBMIT_LAYER_LABEL_SIZE;
        parseLayerNamesGroup.parseLayerNamesLabel.helpTip = 'Allows you to specify how the layer names should be formatted. You can then grab parts of the formatting and stick them in either the output name or the subfolder format box with square brackets. So, for example, if you are naming your layers something like "ops024_a_diff", you could put "<graphic>_<layer>_<pass>" in this box. Then in the subfolder box, you could put "[graphic]\\[layer]\\v001\\[pass]", which would give you "ops024\\a\\v001\\diff" as the subfolder structure.';
        parseLayerNamesGroup.parseLayerNames = parseLayerNamesGroup.add('edittext', undefined, initLayerNameParse)
        parseLayerNamesGroup.parseLayerNames.size = LAYER_TEXT_SIZE;

        // Create Output settings panel, groups, and widgets to use for the comps (needed since we're not grabbing stuff already in the queue)
        deadlineCloudSubmitLayers.outputPanel = deadlineCloudSubmitLayers.layersDialog.add('panel', undefined, 'Output Settings');

        renderSettingsGroup = deadlineCloudSubmitLayers.outputPanel.add('group', undefined);
        renderSettingsGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        renderSettingsGroup.renderSettingsLabel = renderSettingsGroup.add('statictext', undefined, 'Render Settings');
        renderSettingsGroup.renderSettingsLabel.size = SUBMIT_LAYER_LABEL_SIZE;
        renderSettingsGroup.renderSettingsLabel.helpTip = 'Select which render settings to use.';
        renderSettingsGroup.renderSettings = renderSettingsGroup.add('dropdownlist', undefined);
        renderSettingsGroup.renderSettings.size = LAYER_COMBO_SIZE;

        outputModuleGroup = deadlineCloudSubmitLayers.outputPanel.add('group', undefined);
        outputModuleGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        outputModuleGroup.outputModuleLabel = outputModuleGroup.add('statictext', undefined, 'Output Module');
        outputModuleGroup.outputModuleLabel.size = SUBMIT_LAYER_LABEL_SIZE;
        outputModuleGroup.outputModuleLabel.helpTip = 'Select which output module to use.';
        outputModuleGroup.outputModule = outputModuleGroup.add('dropdownlist', undefined);
        outputModuleGroup.outputModule.size = LAYER_COMBO_SIZE;

        outputFormatGroup = deadlineCloudSubmitLayers.outputPanel.add('group', undefined);
        outputFormatGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        outputFormatGroup.outputFormatLabel = outputFormatGroup.add('statictext', undefined, 'Output Format');
        outputFormatGroup.outputFormatLabel.size = SUBMIT_LAYER_LABEL_SIZE;
        outputFormatGroup.outputFormatLabel.helpTip = 'Specify how the output file name should be formatted.';
        // REMARK: Format is quite specific: desired_file_name => not desired_file_name_[####].extension ====> both the file numbering and extension will be added based on the template
        outputFormatGroup.outputFormat = outputFormatGroup.add('edittext', undefined, initOutputFormat);
        outputFormatGroup.outputFormat.size = LAYER_TEXT_SIZE;

        outputFolderGroup = deadlineCloudSubmitLayers.outputPanel.add('group', undefined);
        outputFolderGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        outputFolderGroup.outputFolderLabel = outputFolderGroup.add('statictext', undefined, 'Output Folder');
        outputFolderGroup.outputFolderLabel.size = SUBMIT_LAYER_LABEL_SIZE;
        outputFolderGroup.outputFolderLabel.helpTip = 'Specify where the output files should be rendered to.';
        outputFolderGroup.outputFolder = outputFolderGroup.add('edittext', undefined, initOutputFolder);
        outputFolderGroup.outputFolder.size = LAYER_BROWSE_TEXT_SIZE;
        outputFolderGroup.browseButton = outputFolderGroup.add('button', undefined, '...');
        outputFolderGroup.browseButton.size = LAYER_BUTTON_SIZE;

        // Create use folder group, and widgets
        useSubfoldersGroup = deadlineCloudSubmitLayers.outputPanel.add('group', undefined);
        useSubfoldersGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];
        useSubfoldersGroup.useSubfolders = useSubfoldersGroup.add('checkbox', undefined, 'Use Subfolders');
        useSubfoldersGroup.useSubfolders.value = initUseSubfolders;
        useSubfoldersGroup.useSubfolders.size = SUBMIT_LAYER_LABEL_SIZE;
        useSubfoldersGroup.useSubfolders.helpTip = ' Enable this to render each layer to its own subfolder. If this is enabled, you must also specify the subfolder format.';

        useSubfoldersGroup.subfolderFormat = useSubfoldersGroup.add('edittext', undefined, initSubfolderFormat);
        useSubfoldersGroup.subfolderFormat.enabled = initUseSubfolders;
        useSubfoldersGroup.subfolderFormat.size = LAYER_TEXT_SIZE;

        // Create button group, and widgets
        buttonGroup = deadlineCloudSubmitLayers.layersDialog.add('group', undefined);
        buttonGroup.alignment = [ScriptUI.Alignment.FILL, ScriptUI.Alignment.TOP];

        buttonGroup.progressBar = buttonGroup.add('progressbar', undefined, '');
        buttonGroup.progressBar.size = [262, 20];
        buttonGroup.progressBar.value = 0;

        //submit button
        buttonGroup.submitButton = buttonGroup.add('button', undefined, 'Submit');

        //close button
        buttonGroup.closeButton = buttonGroup.add('button', undefined, 'Close');

        initConnectionsLayers();
    }

    function initConnectionsLayers() {
        /**
         * Connect initialized widgets from initSubmitLayers to their functionality(ex. button press -> exe function)
         */

        // Preserved group functionality
        preserveUnselectedGroup.preserveUnselected.onClick = function() {
            var enableOthers = !preserveUnselectedGroup.preserveUnselected.value;

            preserveCameraGroup.preserveCamera.enabled = enableOthers;
            preserveCameraGroup.preserveLights.enabled = enableOthers;
            preserveAVGroup.preserveAV.enabled = enableOthers;
            preserveAVGroup.preserveAdjustments.enabled = enableOthers;
            makeClickHandlerSubmitLayer("Layers_PreserveUnselected", preserveUnselectedGroup.preserveUnselected, dcUtil.toBooleanString);
        }

        // Preserve camera  functionality + update
        preserveCameraGroup.preserveCamera.onClick = function() {
            makeClickHandlerSubmitLayer("Layers_PreserveCamera", preserveCameraGroup.preserveCamera, dcUtil.toBooleanString);
        }

        //Preserve lights functionality + update
        preserveCameraGroup.preserveLights.onClick = function() {
            makeClickHandlerSubmitLayer("Layers_PreserveLights", preserveCameraGroup.preserveLights, dcUtil.toBooleanString);
        }

        // Preserve adjustments functionality + update
        preserveAVGroup.preserveAdjustments.onClick = function() {
            makeClickHandlerSubmitLayer("Layers_PreserveAdjustments", preserveAVGroup.preserveAdjustments, dcUtil.toBooleanString);
        }

        // preserve AV  functionality + update
        preserveAVGroup.preserveAV.onClick = function() {
            makeClickHandlerSubmitLayer("Layers_PreserveAV", preserveAVGroup.preserveAV, dcUtil.toBooleanString);
        }

        // Output folder browse button functionality
        outputFolderGroup.browseButton.onClick = function() {
            var outFolder = Folder.selectDialog();
            if (outFolder != null)
                outputFolderGroup.outputFolder.text = outFolder.fsName;
            deadlineCloudConfiguration["Layers_OutputFolder"] = outputFolderGroup.outputFolder.text;
            logger.log("Set " + "Layers_OutputFolder" + " to " + outputFolderGroup.outputFolder.text, _scriptFileSubmitLayersName, LOG_LEVEL.DEBUG);
        }

        // Output Folder functionality and update
        outputFolderGroup.outputFolder.onChange = function() {
            deadlineCloudConfiguration["Layers_OutputFolder"] = outputFolderGroup.outputFolder.text;
            logger.log("Set " + "Layers_OutputFolder" + " to " + outputFolderGroup.outputFolder.text, _scriptFileSubmitLayersName, LOG_LEVEL.DEBUG);
        }

        // Output format functionality and update
        outputFormatGroup.outputFormat.onChange = function() {
            deadlineCloudConfiguration["Layers_OutputFormat"] = outputFormatGroup.outputFormat.text;
            logger.log("Set " + "Layers_OutputFormat" + " to " + outputFormatGroup.outputFormat.text, _scriptFileSubmitLayersName, LOG_LEVEL.DEBUG);
        }

        // Use folders checkbox functionality + update
        useSubfoldersGroup.useSubfolders.onClick = function() {
            useSubfoldersGroup.subfolderFormat.enabled = useSubfoldersGroup.useSubfolders.value;
            makeClickHandlerSubmitLayer("Layers_UseSubfolders", useSubfoldersGroup.useSubfolders, dcUtil.toBooleanString);
        }

        // Sub folder format functionality + update
        useSubfoldersGroup.subfolderFormat.onChange = function() {
            deadlineCloudConfiguration["Layers_SubfolderFormat"] = useSubfoldersGroup.subfolderFormat.text;
            logger.log("Set " + "Layers_SubfolderFormat" + " to " + useSubfoldersGroup.subfolderFormat.text, _scriptFileSubmitLayersName, LOG_LEVEL.DEBUG);
        }

        // Layer Name Parsing Functionality + update
        parseLayerNamesGroup.parseLayerNames.onChange = function() {
            deadlineCloudConfiguration["Layers_NameParsing"] = parseLayerNamesGroup.parseLayerNames.text;
            logger.log("Set " + "Layers_NameParsing" + " to " + parseLayerNamesGroup.parseLayerNames.text, _scriptFileSubmitLayersName, LOG_LEVEL.DEBUG);
        }

        //need to grab the values from the dropdown list (make a temp addition to render queue and grab from there)
        var rqItem = app.project.renderQueue.items.add(app.project.activeItem);

        for (var i = 0; i < rqItem.templates.length; i++) {
            if (rqItem.templates[i].substring(0, 7) != '_HIDDEN')
                renderSettingsGroup.renderSettings.add("item", rqItem.templates[i]);
        }
        var item = renderSettingsGroup.renderSettings.find(initRenderSettings);
        if (item != null)
            renderSettingsGroup.renderSettings.selection = item;
        else if (rqItem.templates.length > 0) {
            var item = renderSettingsGroup.renderSettings.find(rqItem.templates[0]);
            if (item != null)
                renderSettingsGroup.renderSettings.selection = item;
        }

        // Render Settings on change functionality + update
        renderSettingsGroup.renderSettings.onChange = function() {
            if (renderSettingsGroup.renderSettings.selection != undefined) {
                deadlineCloudConfiguration["Layers_RenderSettings"] = renderSettingsGroup.renderSettings.selection.toString();
                logger.log("Set " + "Layers_RenderSettings" + " to " + renderSettingsGroup.renderSettings.selection.toString(), _scriptFileSubmitLayersName, LOG_LEVEL.DEBUG);
            }
        }

        //available output modules
        var outMod = rqItem.outputModule(1);
        for (var i = 0; i < outMod.templates.length; i++) {
            if (outMod.templates[i].substring(0, 7) != '_HIDDEN')
                outputModuleGroup.outputModule.add("item", outMod.templates[i]);
        }
        item = outputModuleGroup.outputModule.find(initOutputModule);
        if (item != null)
            outputModuleGroup.outputModule.selection = item;
        else if (outMod.templates.length > 0) {
            item = outputModuleGroup.outputModule.find(outMod.templates[0]);
            if (item != null)
                outputModuleGroup.outputModule.selection = item;
        }
        outputModuleGroup.outputModule.onChange = function() {
            if (outputModuleGroup.outputModule.selection != undefined) {
                deadlineCloudConfiguration["Layers_OutputModule"] = outputModuleGroup.outputModule.selection.toString();
                logger.log("Set " + "Layers_OutputModule" + " to " + outputModuleGroup.outputModule.selection.toString(), _scriptFileSubmitLayersName, LOG_LEVEL.DEBUG);
            }
        }
        rqItem.remove();

        // Submit button functionality
        buttonGroup.submitButton.onClick = submitLayersButton;

        // Close button functionality
        buttonGroup.closeButton.onClick = clsButton;
    }

    function submitLayersButton() {
        logger.info("Clicked Submit button!", _scriptFileSubmitLayersName);
        var activeCompSubmit = app.project.activeItem;
        results = "";
        errors = "";
        logger.info("Chosen Render Settings: " + renderSettingsGroup.renderSettings.selection.text, _scriptFileSubmitLayersName);
        if (renderSettingsGroup.renderSettings.selection == null)
            errors += "Please select an entry for the Render Settings.\n";

        if (outputModuleGroup.outputModule.selection == null)
            errors += "Please select an entry for the Output Module.\n";
        // Validate frame ranges given
        var __frameList = frameListGroup.frameList.text;
        __frameList = dcUtil.getDuplicateFrames(__frameList);
        if(__frameList.length != 0)
        {
            errors += "\nPlease give a correct frame list. Current frame list has duplicate frames and/or is wrong.\n";
        }

        if (errors != "") {
            errors += "\nPlease fix these errors before submitting your job to Deadline.";
            alert(errors);
            return;
        }
        
        //Grabs the layer parsing string if it's there
        var parsingRegexs = {};
        parseString = parseLayerNamesGroup.parseLayerNames.text;
        parseString = parseString.replace(/([\(\)\[\]\{\}\.\*\+\?\|\/\\])/g, '\\$1'); //replace special regex chars with their escaped equivalents
        regexp = /<(.*?)>/;

        while (parseString.match(regexp) !== null) {
            var tempString = parseString;
            var varName = RegExp.$1;

            replaceRegex = new RegExp("<" + varName + ">", "ig");
            tempString = tempString.replace(replaceRegex, "(.*?)");
            tempString = tempString.replace(/<.*?>/g, ".*?");
            parsingRegexs[varName] = "^" + tempString + "$";
            parseString = parseString.replace(replaceRegex, ".*?");
        }
        //create a duplicate comp, so we don't accidentally mess with settings
        var duplicateComp = activeCompSubmit.duplicate();

        var renderCam = preserveCameraGroup.preserveCamera.value;
        var renderLights = preserveCameraGroup.preserveLights.value;

        var renderAdjustments = preserveAVGroup.preserveAdjustments.value;
        var renderAV = preserveAVGroup.preserveAV.value;
        var renderUnselected = preserveUnselectedGroup.preserveUnselected.value;
        var topCam = true;
        var invalidCharLayers = "";
        var submitCount = 0;
        duplicateComp.name = activeCompSubmit.name;
        //go through all the layers in the active comp and disable the ones we're not ALWAYS rendering
        for (var i = 1; i <= duplicateComp.layers.length; i++) {
            var currLayer = duplicateComp.layers[i];

            if (activeCompSubmit.layers[i].selected)
                currLayer.selected = true;

            if (currLayer.matchName == "ADBE Camera Layer" && renderCam && topCam) //only topmost camera layer is rendered (if option is specified)
            {
                topCam = false;
                //do nothing else, since we want this layer enabled
            } else {
                //figure out if this is an unselected layer we are going to render
                alwaysRender = renderUnselected; //always render if unselected and option specified
                //alwaysRender = alwaysRender || (currLayer("Light Options") != null && renderLights); //always render if light layer and option specified
                alwaysRender = alwaysRender || (currLayer.matchName == "ADBE Light Layer" && renderLights); //always render if light layer and option specified
                alwaysRender = alwaysRender || (currLayer.adjustmentLayer && renderAdjustments); //always render if adjustment layer and option specified
                alwaysRender = alwaysRender || ((currLayer.hasVideo || currLayer.hasAudio) && renderAV); //always render if AV layer and option specified

                if (currLayer.selected || !alwaysRender) //unless one of the above conditions were met (or if layer is selected), disable layer
                {
                    currLayer.enabled = false;
                    currLayer.audioEnabled = false;

                    fixedLayerName = currLayer.name.replace(/([\*\?\|:\"<>\/\\%£])/g, '_'); //replace invalid path characters with an underscore

                    if (fixedLayerName != currLayer.name)
                        invalidCharLayers = invalidCharLayers + currLayer.name + "\n";
                }
            }
        }

        if (invalidCharLayers.length == 0 || confirm("The following layers contain invalid path characters:\n\n" + invalidCharLayers + "\nThe following are considered invalid characters: *, ?, |, :, \", <, >, /, \\, %, £\nIf you chose to continue, invalid characters in the output path will be replaced by an underscore '_'. \nContinue?")) {
            var deleteTempXmlFile = false;
            var restoreProjectPath = false;
            var projectPath = app.project.file.fsName;
            var oldProjectPath = projectPath;
            var oldGPUAccelType = dcUtil.checkGPUAccelType(true);

            // See if we need to save the current scene as an aepx file first.
            if (ignoreMissingLayersGroup.exportAsXml.value && projectPath.indexOf(".aep", projectPath.length - 4) != -1) {
                app.project.save(File(projectPath.substring(0, projectPath.length - 4) + ".aepx"));
                restoreProjectPath = true;
                if (dialog.deleteTempXml.value && dialog.submitScene.value) {
                    deleteTempXmlFile = true;
                }
            } else {
                app.project.save(app.project.file);
            }

            buttonGroup.progressBar.value = 0;
            
            var selectedRenderSettings = renderSettingsGroup.renderSettings.selection;
            var selectedOutputModule = outputModuleGroup.outputModule.selection;

            //go through selected layers and render them one at a time
            for (var i = 0; i < duplicateComp.selectedLayers.length; i++) {
                buttonGroup.progressBar.value = ((i + 1) * 100) / (duplicateComp.selectedLayers.length + 1);

                var currLayer = duplicateComp.selectedLayers[i];
                //if it's already enabled, it means we're always rendering the layer, so skip it (unless it's the last one and we haven't submitted anything yet)
                if (!currLayer.enabled || (submitCount == 0 && i == duplicateComp.selectedLayers.length)) {
                    currLayer.enabled = true;
                    if (currLayer.hasAudio)
                        currLayer.audioEnabled = true;

                    var parsedTokens = {};
                    var layerName = currLayer.name;
                    for (var varName in parsingRegexs) {
                        parsingRE = new RegExp(parsingRegexs[varName], "i");
                        if (!parsingRE.test(layerName)) {
                            alert("The layer name \"" + layerName + "\" does not match the parsing string.\nParsing will not be performed for this layer name.");
                            break;
                        } else {
                            parsedTokens[varName] = RegExp.$1;
                        }
                    }
                    var rqItem = app.project.renderQueue.items.add(duplicateComp);



                    var outMod = rqItem.outputModule(1);
                    var outputFolder = dcUtil.trim(outputFolderGroup.outputFolder.text);

                    // \ / : * ? " < > |
                    var fixedLayerName = currLayer.name.replace(/([\*\?\|:\"<>\/\\%£])/g, '_'); //replace invalid path characters with an underscore

                    if (useSubfoldersGroup.useSubfolders.value) {

                        outputFolder = outputFolder + "/" + dcUtil.trim(useSubfoldersGroup.subfolderFormat.text);
                        outputFolder = outputFolder.replace("\[layerName\]", dcUtil.trim(fixedLayerName));
                        for (var varName in parsedTokens)
                            outputFolder = outputFolder.replace("\[" + varName + "\]", dcUtil.trim(parsedTokens[varName]));

                        //set the folder as the file for the output module temporarily - this makes it replace the [compName], etc. templates.
                        //the dummy extension is added, since AE will automatically add an extension if one isn't provided.
                        //outMod.file = new Folder(outputFolder + "._DUMMY_");
                        outMod.file = new Folder(outputFolder);
                        //outputFolder = outputFolder.replace("._DUMMY_", "");

                        //creates the subfolder
                        subFolder = new Folder(outputFolder);
                        if (subFolder.exists) {
                            alert("Specified Sub Folder already exists, please pick a unique name. Canceling submission");
                            return buttonGroup.progressBar.value = 0;
                        }
                        subFolder.create();
                    }

                    var outputFormat = outputFormatGroup.outputFormat.text;
                    outputFormat = outputFormat.replace("\[layerName\]", fixedLayerName);
                    for (var varName in parsedTokens)
                        outputFormat = outputFormat.replace("\[" + varName + "\]", parsedTokens[varName]);
                    outMod.file = new File(outputFolder + "/" + outputFormat);

                    // Set template after we set the outputfolder
                    rqItem.applyTemplate(selectedRenderSettings);
                    outMod.applyTemplate(selectedOutputModule);
                    // Check if Skip Existing Files is enabled -> Later on add functionality to it actually changing when a specific file extension is used.
                    var renderSettings = rqItem.getSettings();

                    //need to save project between every pass, since we're submitting the scene file (otherwise it'll just render the same thing each time)
                    app.project.save(app.project.file);

                    if (renderSettings["Skip Existing Files"] == "false") {
                        var newSettings = {
                            "Skip Existing Files": true
                        };
                        rqItem.setSettings(newSettings);
                        logger.info("Forced Skip Existing Files on.", _scriptFileSubmitLayersName);
                    }
                    if(i == 0 && dcProperties.config.auto_accept.get() == "False" && !dcUtil.validateAutoAccept())
                    {
                        rqItem.remove();
                        currLayer.enabled = false;
                        currLayer.audioEnabled = false;
                        logger.info("Pressed cancel upload job attachments, aborting entire submission process.", _scriptFileSubmitLayersName);
                        break;
                    }
                    // Fixed layer name is not allowed to have illegal characters(for now only checking on '.', should be updated later if others come up)
                    // Change '.' into '_', ' ' into '_'

                    fixedLayerName = dcUtil.removeIllegalCharacters(fixedLayerName);
                    var submissionResult = dcSubmitButton.submitRenderQueueToDeadlineCloud(rqItem, fixedLayerName);
                    if(!submissionResult)
                    {
                        rqItem.remove();
                        currLayer.enabled = false;
                        currLayer.audioEnabled = false;
                        alert("Failed to submit job for " + fixedLayerName + ".")
                        continue;
                    }
                    submitCount++;
                    rqItem.remove();
                    currLayer.enabled = false;
                    currLayer.audioEnabled = false;

                }
            }

            buttonGroup.progressBar.value = 100;
            alert("Completed submission.\n" + submitCount + " of " + duplicateComp.selectedLayers.length + " jobs were submitted successfully.");
            duplicateComp.remove();
            app.project.save(app.project.file);

            if (renderSettings["Skip Existing Files"] == "true") {
                buttonGroup.progressBar.value = 100;

                //remove the duplicate comp, and save project again
                duplicateComp.remove();
                app.project.save(app.project.file);
                // Restore the original project path if necessary.
                if (restoreProjectPath) {
                    //Delete temp aepx project file if generated by Deadline job submission prior to restoring project path.
                    if (deleteTempXmlFile) {
                        var tempXmlFile = File(projectPath);
                        tempXmlFile.remove();
                    }
                    app.open(File(oldProjectPath));
                    projectName = app.project.file.name; //reset to current projectName for subsequent job submissions.
                    projectPath = app.project.file.fsName; //reset to current projectPath for subsequent job submissions.
                } else if (oldGPUAccelType != null) {
                    app.project.gpuAccelType = oldGPUAccelType;
                }
            }

        }
        if (results.length > 0)
            alert(results);
    }

    function clsButton() {
        /**
         * Close Submit Layers Window
         */

        logger.log("Closing Submit Layer Window", _scriptFileSubmitLayersName, LOG_LEVEL.INFO);
        deadlineCloudSubmitLayers.layersDialog.close();
    }

    // This function will need to be changed so it is accessible for multiple files!
    function makeClickHandlerSubmitLayer(paramName, sourceElement, typeToStrFunction) {
        function handler() {
            var paramAsStr = typeToStrFunction(sourceElement.value);
            deadlineCloudConfiguration[paramName] = paramAsStr;
            logger.log("Set " + paramName + " to " + paramAsStr, _scriptFileSubmitLayersName, LOG_LEVEL.DEBUG);
        }
        return handler();
    }

    return {
        "SubmitLayersToDeadline": SubmitLayersToDeadline
    }
}

dcSubmitLayerButton = __generateSubmitLayerButton();

    initData();
    dcLoadingWindow.update();
    dcLoadingWindow.close();
    dcSubmitterUi.createUI();
}
// INIT DATA TO FILL PROPERTIES
function initData(){
    /**
    * Initializes data on startup. Performs system calls to query for
    *  relevant deadline configuration information.
    */
    dcLoadingWindow = dcInitData.loadingUIWindow();
    dcLoadingWindow.children[1].value = (1 * 100) / (5 + 1);
    dcLoadingWindow.children[0].text = "Loading Deadline Config in progress.";
    dcLoadingWindow.update();
    dcInitData.initDeadlineConfig();
    dcLoadingWindow.children[1].value = (2 * 100) / (5 + 1);
    dcLoadingWindow.children[0].text = "Loading Deadline Farms in progress.";
    dcLoadingWindow.update();
    dcInitData.initDeadlineFarmData();
    dcLoadingWindow.children[1].value = (3 * 100) / (5 + 1);
    dcLoadingWindow.children[0].text = "Loading Deadline Profiles in progress.";
    dcLoadingWindow.update();
    dcInitData.initDeadlineProfiles();
    dcLoadingWindow.children[1].value = (4 * 100) / (5 + 1);
    dcLoadingWindow.children[0].text = "Loading FootageItems in progress.";
    dcLoadingWindow.update();
    dcInitData.initAutoDetectFootageItems();
    dcLoadingWindow.children[1].value = (5 * 100) / (5 + 1);
    dcLoadingWindow.children[0].text = "Loading OutputDirectories in progress.";
    dcLoadingWindow.update();
    dcInitData.initAutoDetectOutputDirectories();
}

