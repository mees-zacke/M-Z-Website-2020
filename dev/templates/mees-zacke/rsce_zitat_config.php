<?php
return array(
    'label' => array('Zitat', 'Gestaltetes Zitat'),
    'types' => array('content', 'module'),
    'contentCategory' => 'texts',
    'moduleCategory' => 'miscellaneous',
    'standardFields' => array('headline', 'cssID'),
    'wrapper' => array(
        'type' => 'none',
    ),
    'fields' => array(
        'zitat' => array(
            'label' => array('Zitat', 'Der Text des Zitats'),
            'eval' => ['rte' => 'tinyMCE'],
            'inputType' => 'textarea',
        ),
        'author' => array(
            'label' => array('Autor', 'Der Autor des Zitats'),
            'eval' => ['rte' => 'tinyMCE'],
            'inputType' => 'textarea',
        ),
    ),
);