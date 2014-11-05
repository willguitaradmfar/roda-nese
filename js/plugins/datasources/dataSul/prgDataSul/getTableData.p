
Def Input Param pTable As Char No-undo.
Def Output param pJSON  As Memptr No-undo.
Def Output Param pOK As Log No-undo.

Def New Shared Var lret As  Log No-undo.
Def New Shared Var mPointer As Memptr No-undo.

Def Var pTTable As Char No-undo.
pttable = "tt" + ptable.

Run c:\tmp\getData.i ptable pttable.

Assign pOK = lret
       pJSON = mPointer.






