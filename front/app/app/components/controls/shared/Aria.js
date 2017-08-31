import Enum from '../../utils/Enum';

// Refer 
// http://a11yproject.com/posts/getting-started-aria/
// https://www.w3.org/TR/wai-aria/roles

export const ARIA_WIDGETS = Enum('alert','alertdialog','button','checkbox','dialog','gridcell','link','log','marquee','menuitem','menuitemcheckbox','menuitemradio','option','progressbar','radio','scrollbar','slider','spinbutton','status','tab','tabpanel','textbox','timer','tooltip','treeitem');

export const ARIA_COMPOSITE_WIDGETS = Enum('combobox','grid','listbox','menu','menubar','radiogroup','tablist','tree','treegrid');

export const ARIA_DOCUMENT = Enum('article','columnheader','definition','directory','document','group','heading','img','list','listitem','math','note','presentation','region','row','rowgroup','rowheader','separator','toolbar');

export const ARIA_LANDMARK = Enum('application','banner','complementary','contentinfo','form','main','navigation','search');