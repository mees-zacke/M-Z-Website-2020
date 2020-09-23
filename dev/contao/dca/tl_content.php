<?php

// H2 als standard bei Überschriften setzen
$GLOBALS['TL_DCA']['tl_content']['fields']['headline']['default'] = array('unit'=>'h2', 'value'=>'');
$GLOBALS['TL_DCA']['tl_content']['fields']['headline']['eval']['allowHtml'] = true;

// Auswählbare Position und Breite von Inhaltselementen

$GLOBALS['TL_DCA']['tl_content']['palettes'] = str_replace(',type',',type,gridStart,gridSpan',$GLOBALS['TL_DCA']['tl_content']['palettes']);

$GLOBALS['TL_DCA']['tl_content']['fields']['gridSpan'] = [
    'label' => ['Breite', 'Breite des Elements innerhalb des 14er Rasters'],
    'inputType' => 'select',
    'options' => ['default', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13' , '14'],
    'eval' => ['maxlength'=>12, 'tl_class'=>'w50' ],
    'sql' => [
        'type' => 'string',
        'length' => 32,
        'default' => ''
    ],
];

$GLOBALS['TL_DCA']['tl_content']['fields']['gridStart'] = [
    'label' => ['Position', 'Position des Elements im 12er Raster (Breite und Position dürfen zusammen nicht größer als 15 sein)'],
    'inputType' => 'select',
    'options' => ['default', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13' , '14'],
    'eval' => ['maxlength'=>12, 'tl_class'=>'w50 clr' ],
    'sql' => [
        'type' => 'string',
        'length' => 32,
        'default' => ''
    ],
];
