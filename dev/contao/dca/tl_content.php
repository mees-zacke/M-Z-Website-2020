<?php

// H2 als standard bei Überschriften setzen
$GLOBALS['TL_DCA']['tl_content']['fields']['headline']['default'] = array('unit'=>'h2', 'value'=>'');
$GLOBALS['TL_DCA']['tl_content']['fields']['headline']['eval']['allowHtml'] = true; 