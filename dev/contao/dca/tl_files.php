<?php

if(TL_MODE === 'BE') 
{ 
$GLOBALS['TL_DCA']['tl_files']['fields']['meta']['eval']['metaFields']['copyright'] = '';
$GLOBALS['TL_DCA']['tl_files']['fields']['meta']['eval']['metaFields']['caption'] = '';
}
