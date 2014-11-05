
Def Input Param pTable As Char No-undo.
Def Output param pJSON  As Memptr No-undo.
Def Output Param pOK As Log No-undo.

Def Temp-table ttMetadados
    Field cName     As Char
    Field cDataType As Char
    Field cFormat   As Char
    Field cLabel    As Char.


Empty Temp-table ttMetadados.

For Each  _file
    Where _file._file-name = pTable,
    Each _field Of _file:

    Create ttMetadados.
    Assign ttMetadados.cName     = _field._field-name
           ttMetadados.cDataType = _field._data-type
           ttmetadados.cformat   = _field._format
           ttmetadados.cLabel    = _field._label.


End.

Def Var lret As Log No-undo.
lret = Temp-table ttMetadados:Write-json("file", "c:\tmp\metadados.json").
lret = Temp-table ttMetadados:Write-json("MEMPTR", pJSON).



