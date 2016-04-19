READ ME

Huidige implementatie

- Configuratie
○ Server omgeving

- Authenticatie
○ Login
○ Interceptor Token
○ Over alle requests heen

- User
○ Account Info
○ UserProfile
§ N: UserProfile Image
○ UserProfile READ
- Web
○ Web Properties READ
○ Web Lists READ
- List
○ By Name /GUID
○ List Properties Read
○ List Items
- Items
○ By Id
○ Item Properties Read
○ Item Fields
○ Item Create / Update / Delete
○ Item Attachments
- Attachments
○ By Name
○ Attachment properties
○ N :Attachment  SOAP ( Android IOS )
○ Y: Attachment REST ( Windows )
- UI
○ Test Field 
○ Note Field
○ Currency Field
○ Number Field
○ Date Field 
○ DateTime Field
○ Choice Field
○ N: Open Choice Field
○ N: Choice DropDown Field
○ CheckBox
○ N :CheckBox Group 
○ N: Attachment Field
○ N: Created Field ReadOnly
○ N: Creator Field ReadOnly
○ N: Modified Field ReadOnly

Item.Field Properties

Common Field Properties
    __metadata.type : string : Gets or sets a value that specifies the type of the field.
    FieldTypeKind : Int32 | Gets or sets a value that specifies the type of the field. Represents a FieldType value. See FieldType in the .NET client object model reference for a list of field type values.
    DefaultValue : String | Gets or sets a value that specifies the default value for the field.
    Description : String | Gets or sets a value that specifies the description of the field.
    EntityPropertyName : String | Gets the name of the entity property for the list item entity that uses this field.
    Hidden : Boolean | Gets or sets a value that specifies whether the field is hidden in list views and list forms.
    ReadOnlyField : Boolean | Gets or sets a value that specifies whether the value of the field is read-only.
    Required : Boolean | Gets or sets a value that specifies whether the field requires a value.
    Title : String | Gets or sets value that specifies the display name of the field.
    ValidationFormula : String | Gets or sets a value that specifies the data validation criteria for the value of the field.
    ValidationMessage : STRING | Gets or sets a value that specifies the error message returned when data validation fails for the field.

SP.FieldNumber - 1 - integer - Specifies that the field contains an integer value.
    MaximumValue : Gets or sets a value that specifies the minimum allowed value for the field.
    MinimumValue : Gets or sets a value that specifies the minimum allowed value for the field.

SP.FieldText - 2 - text - Specifies that the field contains a single line of text.
    MaxLength : Int32 | Gets or sets a value that specifies the maximum number of characters allowed in the value of the field.

SP.FieldMultiLineText - 3 - note - Specifies that the field contains multiple lines of text.
    AllowHyperlink : Boolean | Gets or sets a value that specifies whether a hyperlink is allowed as a value of the field.
    AppendOnly : Boolean | Gets or sets a value that specifies whether all changes to the value of the field are displayed in list forms.
    NumberOfLines : Int32 | Gets or sets a value that specifies the number of lines of text to display for the field.
    RestrictedMode : Boolean | Gets or sets a value that specifies whether the field supports a subset of rich formatting.
    RichText : Boolean | Gets or sets a value that specifies whether the field supports rich formatting.
    WikiLinking: Boolean | Gets a value that specifies whether an implementation specific mechanism for linking wiki pages is supported.

SP.FieldDateTime - 4 - dateTime - Specifies that the field contains a date and time value or a date-only value.
    DateTimeCalendarType : Int32 | Gets or sets a value that specifies the calendar type of the field. Represents a CalendarType value: Gregorian (localized) = 1
    DisplayFormat : Int32 | Gets or sets the format of the date and time that is displayed in the field. Represents a DateTimeFieldFormatType value: DateOnly = 0, DateTime = 1.
    FriendlyDisplayFormat : Int32 | Represents a DateTimeFieldFriendlyFormat value: Unspecified = 0, Disabled (standard absolute) = 1, Relative (standard friendly relative) = 2.

SP.FieldChoice - 6 - choice - Specifies that the field contains a single value from a set of specified values.
    Choices : Collection results[] | Gets or sets a value that specifies values that are available for selection in the field.
    EditFormat : Int32 | Determines whether to display the choice field as option buttons (also known as "radio buttons") or as a drop-down list. Represents a ChoiceFormatType value: Dropdown = 0, RadioButtons = 1.
    FillInChoice : Boolean | Gets or sets a value that specifies whether the field can accept values other than those specified by the Choices property.

SP.Field - 8 - Boolean Specifies that the field contains a Boolean value.

SP.FieldNumber - 9 - number - Specifies that the field contains a floating-point number value.
    MaximumValue : Gets or sets a value that specifies the minimum allowed value for the field.
    MinimumValue : Gets or sets a value that specifies the minimum allowed value for the field.

SP.FieldCurrency - 10 - currency - Specifies that the field contains a currency value.
    MaximumValue : Gets or sets a value that specifies the minimum allowed value for the field.
    MinimumValue : Gets or sets a value that specifies the minimum allowed value for the field.
    CurrencyLocaleId : Int32 | Gets or sets a value that specifies the language code identifier (LCID) used to format the value of the field.

SP.FieldUrl - 11 - URL - Specifies that the field contains a URI and an optional description of the URI.
    DisplayFormat : Int32 | Gets or sets a value that specifies the display format for the value in the field. Represents a UrlFieldFormatType value: Hyperlink = 0, Image = 1.

SP.FieldMultiChoice - 15 - multiChoice - Specifies that the field contains one or more values from a set of specified values.
    FillInChoice : boolean
    Choices - results[] : array of choices

SP.FieldRatingScale - 16 - Specifies a field that contains rating scale values for a survey list.
    Choices : Collection results[] | Gets or sets a value that specifies values that are available for selection in the field.
    FillInChoice : Boolean | Gets or sets a value that specifies whether the field can accept values other than those specified by the Choices property.

SP.Field - file - 18 - Specifies that the field contains the leaf name of a document as a value.
SP.Field - attachments - 19 - Specifies that the field indicates whether the list item has attachments.
SP.FieldUser - user - 20 - Specifies that the field contains one or more users and groups as values.

[TODO tbd] SP.Field - modStat - 23 - Specifies that the field indicates moderation status.
[TODO tbd] SP.Field - workflowStatus - 28 - Specifies that the field indicates the status of a workflow instance on a list item.
[TODO tbd] SP.Field - workflowEventType - 30 - Specifies that the field contains the most recent event in a workflow instance.
SP.FieldGeolocationValue - geolocation - 31 - Specifies that the field contains geographical location values.
    altitude : The user-defined altitude value for a geolocation field.
    latitude : The latitude value for a geolocation field.
    longitude : The longitude value for a geolocation field.
    measure : The user-defined measure value for a geolocation field.
    typeId : This member is reserved for internal use and is not intended to be used directly from your code.
[TODO tbd]SP.FieldChoice - outcomeChoice - 32
[TODO tbd]    FillInChoice : boolean
[TODO tbd]    Choices - results[] : array of choices
[TODO tbd]    EditFormat : integer for the format







