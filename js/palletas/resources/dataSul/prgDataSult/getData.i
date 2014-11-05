Def  Temp-table {2} Like {1}.
Def Shared Var lret As  Log No-undo.
Def Shared Var mPointer As Memptr No-undo.

Empty Temp-table {2}.

For Each {1} No-lock:
    
    Create {2}.
    Buffer-copy {1} To {2}.
   
End.

lret = Temp-table {2}:Write-json("file", "c:\tmp\metadados.json").
lret = Temp-table {2}:Write-json("MEMPTR", mPointer).


