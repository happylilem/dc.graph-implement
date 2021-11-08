import {PickleTree} from '../pickle/pickle.js';
export class picklePage{
    constructor(){
        this.buildTree();
        this.setEvents();
    }

    buildTree(){
        const elm = document.getElementById('txt_log');
        this.sideElm = [{
            icon:'fa fa-plus',
            title:'Add Child',
            //context button click event
            onClick : async (node) => {
                //console.log('add - '+node.id);
                const { value: title } = await Swal.fire({
                    title: 'Enter Child Name:',
                    input: 'text',
                    showCancelButton: true,
                    inputValidator: (value) => {
                      if (!value) {
                        return 'You need to write something!'
                      }
                    }
                });
                const id = (new Date()).getTime();
                //add new child element
                this.tree.createNode({
                    n_value: id,
                    n_title: title,
                    n_id: id,
                    n_elements : this.sideElm,
                    n_parent: this.tree.getNode(node.value),
                    n_checkStatus: false
                });
            }
        },{
            icon:'fa fa-edit',
            title:'Edit',
            //context button click event
            onClick : async(node) => {
                //console.log('edit - '+node.id);
                const { value: title } = await Swal.fire({
                    title: 'Enter Child Name..',
                    input: 'text',
                    inputValue:node.title,
                    showCancelButton: true,
                    inputValidator: (value) => {
                      if (!value) {
                        return 'You need to write something!'
                      }
                    }
                });
                node.title = title;
                node.updateNode();
            }
        },{
            icon:'fa fa-trash',
            title:'Delete',
            onClick : (node) => {
                console.log('delete - '+node.id);
                node.deleteNode();
            }
        }];
        this.tree = new PickleTree({
            c_target: 'div_treeAnimal',
            rowCreateCallback: (node) => {
                elm.value += node.title +' => element added..\n';
                elm.scrollTop = elm.scrollHeight;
                //console.log(node)
            },
            switchCallback: (node) => {
                elm.value += node.title +' => element switched..\n';
                elm.scrollTop = elm.scrollHeight;
                console.log(node)
            },
            drawCallback: () => {
                //console.log('tree drawed ..');
            },
            dragCallback: (node) => {
                //console.log(node);
            },
            dropCallback: (node) => {
                //retuns node with new parent and old parent in 'old_parent' key!!
                elm.value += node.title +' => element dragged..\n';
                elm.scrollTop = elm.scrollHeight;
                //console.log(node);
            },
            nodeRemoveCallback:(node)=>{
                //returns removed node
                //console.log(node);
                elm.value += node.title +' => element removed..\n';
                elm.scrollTop = elm.scrollHeight;
            },
            c_config: {
                foldedStatus: false,  //start as folded or unfolded
                logMode: false,       //for logging
                switchMode: true,     //for slider switch element
                autoChild :true,      //for automaticly select childs
                autoParent : false,   //for automaticly select parents
                drag: true           //for drag/drop
            },
            c_data: 		[
                  {
                    n_id: 314145,
                    n_title: 'Mammalia',
                    n_parentid: 0,
                    n_elements: this.sideElm
                  },{
            				n_id: 59514,
            				n_title: "Addax",
            				n_parentid: 9959,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 311790,
            				n_title: "Afrotheria",
            				n_parentid: 9347,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9645,
            				n_title: "Ailuropoda",
            				n_parentid: 9632,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9499,
            				n_title: "Alouatta",
            				n_parentid: 38066,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 38066,
            				n_title: "Alouattinae",
            				n_parentid: 378855,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 32524,
            				n_title: "Amniota",
            				n_parentid: 32523,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 91561,
            				n_title: "Artiodactyla",
            				n_parentid: 314145,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 378855,
            				n_title: "Atelidae",
            				n_parentid: 9479,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9766,
            				n_title: "Balaenoptera",
            				n_parentid: 9765,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9765,
            				n_title: "Balaenopteridae",
            				n_parentid: 9761,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 1437010,
            				n_title: "Boreoeutheria",
            				n_parentid: 9347,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9903,
            				n_title: "Bos",
            				n_parentid: 27592,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9895,
            				n_title: "Bovidae",
            				n_parentid: 35500,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 27592,
            				n_title: "Bovinae",
            				n_parentid: 9895,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9918,
            				n_title: "Bubalus",
            				n_parentid: 27592,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 1965096,
            				n_title: "Callithrix",
            				n_parentid: 9481,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9481,
            				n_title: "Callithrix",
            				n_parentid: 9480,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9480,
            				n_title: "Callitrichinae",
            				n_parentid: 9498,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9835,
            				n_title: "Camelidae",
            				n_parentid: 9834,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9836,
            				n_title: "Camelus",
            				n_parentid: 9835,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9608,
            				n_title: "Canidae",
            				n_parentid: 379584,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 379584,
            				n_title: "Caniformia",
            				n_parentid: 33554,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9611,
            				n_title: "Canis",
            				n_parentid: 9608,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9922,
            				n_title: "Capra",
            				n_parentid: 9963,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9963,
            				n_title: "Caprinae",
            				n_parentid: 9895,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 33554,
            				n_title: "Carnivora",
            				n_parentid: 314145,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9526,
            				n_title: "Catarrhini",
            				n_parentid: 314293,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9498,
            				n_title: "Cebidae",
            				n_parentid: 9479,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 38070,
            				n_title: "Cebinae",
            				n_parentid: 9498,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9527,
            				n_title: "Cercopithecidae",
            				n_parentid: 314294,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9528,
            				n_title: "Cercopithecinae",
            				n_parentid: 9527,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 314294,
            				n_title: "Cercopithecoidea",
            				n_parentid: 9526,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9850,
            				n_title: "Cervidae",
            				n_parentid: 35500,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 34878,
            				n_title: "Cervinae",
            				n_parentid: 9850,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9859,
            				n_title: "Cervus",
            				n_parentid: 34878,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9721,
            				n_title: "Cetacea",
            				n_parentid: 2653789,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 376916,
            				n_title: "Chiromyiformes",
            				n_parentid: 376911,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9397,
            				n_title: "Chiroptera",
            				n_parentid: 314145,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9677,
            				n_title: "Crocuta",
            				n_parentid: 9676,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 97204,
            				n_title: "Cystophora",
            				n_parentid: 3014,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 39181,
            				n_title: "Cystophora",
            				n_parentid: 9709,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9277,
            				n_title: "Dasyuridae",
            				n_parentid: 38608,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 38608,
            				n_title: "Dasyuromorphia",
            				n_parentid: 9263,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9278,
            				n_title: "Dasyurus",
            				n_parentid: 9277,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 13038,
            				n_title: "Daubentonia",
            				n_parentid: 30613,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 30613,
            				n_title: "Daubentoniidae",
            				n_parentid: 376916,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9748,
            				n_title: "Delphinapterus",
            				n_parentid: 9747,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9726,
            				n_title: "Delphinidae",
            				n_parentid: 9722,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 38603,
            				n_title: "Dendrolagus",
            				n_parentid: 9307,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9804,
            				n_title: "Diceros",
            				n_parentid: 9803,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 38609,
            				n_title: "Diprotodontia",
            				n_parentid: 9263,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9780,
            				n_title: "Elephantidae",
            				n_parentid: 9779,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9782,
            				n_title: "Elephas",
            				n_parentid: 9780,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9788,
            				n_title: "Equidae",
            				n_parentid: 9787,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9789,
            				n_title: "Equus",
            				n_parentid: 9788,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 35510,
            				n_title: "Equus",
            				n_parentid: 9789,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 39182,
            				n_title: "Erignathus",
            				n_parentid: 9709,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 314146,
            				n_title: "Euarchontoglires",
            				n_parentid: 1437010,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 13513,
            				n_title: "Eulemur",
            				n_parentid: 9445,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9347,
            				n_title: "Eutheria",
            				n_parentid: 32525,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9681,
            				n_title: "Felidae",
            				n_parentid: 379583,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 379583,
            				n_title: "Feliformia",
            				n_parentid: 33554,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 3009,
            				n_title: "Fucales",
            				n_parentid: 2870,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 40297,
            				n_title: "Galagidae",
            				n_parentid: 376917,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9893,
            				n_title: "Giraffa",
            				n_parentid: 9892,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9892,
            				n_title: "Giraffidae",
            				n_parentid: 35500,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9592,
            				n_title: "Gorilla",
            				n_parentid: 207598,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 376913,
            				n_title: "Haplorrhini",
            				n_parentid: 9443,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9959,
            				n_title: "Hippotraginae",
            				n_parentid: 9895,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9604,
            				n_title: "Hominidae",
            				n_parentid: 314295,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 207598,
            				n_title: "Homininae",
            				n_parentid: 9604,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 314295,
            				n_title: "Hominoidea",
            				n_parentid: 9526,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9605,
            				n_title: "Homo",
            				n_parentid: 207598,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9676,
            				n_title: "Hyaenidae",
            				n_parentid: 379583,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9577,
            				n_title: "Hylobatidae",
            				n_parentid: 314295,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 30599,
            				n_title: "Indriidae",
            				n_parentid: 376915,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 4143,
            				n_title: "Lamiales",
            				n_parentid: 91888,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 314145,
            				n_title: "Laurasiatheria",
            				n_parentid: 1437010,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9445,
            				n_title: "Lemuridae",
            				n_parentid: 376915,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 376915,
            				n_title: "Lemuriformes",
            				n_parentid: 376911,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 30587,
            				n_title: "Leontopithecus",
            				n_parentid: 9480,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 101848,
            				n_title: "Lobodon",
            				n_parentid: 9709,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 376917,
            				n_title: "Lorisiformes",
            				n_parentid: 376911,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9784,
            				n_title: "Loxodonta",
            				n_parentid: 9780,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9539,
            				n_title: "Macaca",
            				n_parentid: 9528,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9307,
            				n_title: "Macropodidae",
            				n_parentid: 38609,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9312,
            				n_title: "Macropus",
            				n_parentid: 9307,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 40674,
            				n_title: "Mammalia",
            				n_parentid: 32524,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 41868,
            				n_title: "Martyniaceae",
            				n_parentid: 4143,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 119825,
            				n_title: "Mephitidae",
            				n_parentid: 379584,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 30546,
            				n_title: "Mephitis",
            				n_parentid: 119825,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9263,
            				n_title: "Metatheria",
            				n_parentid: 32525,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9747,
            				n_title: "Monodontidae",
            				n_parentid: 9722,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9255,
            				n_title: "Monotremata",
            				n_parentid: 9254,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9655,
            				n_title: "Mustelidae",
            				n_parentid: 379584,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 169418,
            				n_title: "Mustelinae",
            				n_parentid: 9655,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 71005,
            				n_title: "Myrmecophaga",
            				n_parentid: 9349,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9349,
            				n_title: "Myrmecophagidae",
            				n_parentid: 948952,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9761,
            				n_title: "Mysticeti",
            				n_parentid: 9721,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9650,
            				n_title: "Nasua",
            				n_parentid: 9647,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 61451,
            				n_title: "Neofelis",
            				n_parentid: 338153,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 452645,
            				n_title: "Neovison",
            				n_parentid: 169418,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 1960649,
            				n_title: "Notamacropus",
            				n_parentid: 9307,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9881,
            				n_title: "Odocoileinae",
            				n_parentid: 9850,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9722,
            				n_title: "Odontoceti",
            				n_parentid: 9721,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9256,
            				n_title: "Ornithorhynchidae",
            				n_parentid: 9255,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9257,
            				n_title: "Ornithorhynchus",
            				n_parentid: 9256,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 30610,
            				n_title: "Otolemur",
            				n_parentid: 40297,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9935,
            				n_title: "Ovis",
            				n_parentid: 9963,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 569578,
            				n_title: "PX clade",
            				n_parentid: 2696291,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9596,
            				n_title: "Pan",
            				n_parentid: 207598,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9688,
            				n_title: "Panthera",
            				n_parentid: 338153,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 338153,
            				n_title: "Pantherinae",
            				n_parentid: 9681,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9554,
            				n_title: "Papio",
            				n_parentid: 9528,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 35500,
            				n_title: "Pecora",
            				n_parentid: 9845,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9787,
            				n_title: "Perissodactyla",
            				n_parentid: 314145,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 2870,
            				n_title: "Phaeophyceae",
            				n_parentid: 569578,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9335,
            				n_title: "Phalangeridae",
            				n_parentid: 38609,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 38624,
            				n_title: "Phascolarctidae",
            				n_parentid: 38609,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 38625,
            				n_title: "Phascolarctos",
            				n_parentid: 38624,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9717,
            				n_title: "Phoca",
            				n_parentid: 9709,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9709,
            				n_title: "Phocidae",
            				n_parentid: 379584,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 948950,
            				n_title: "Pilosa",
            				n_parentid: 9348,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9479,
            				n_title: "Platyrrhini",
            				n_parentid: 314293,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 607660,
            				n_title: "Ponginae",
            				n_parentid: 9604,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9599,
            				n_title: "Pongo",
            				n_parentid: 607660,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9443,
            				n_title: "Primates",
            				n_parentid: 314146,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 24234,
            				n_title: "Proboscidea",
            				n_parentid: 41868,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9779,
            				n_title: "Proboscidea",
            				n_parentid: 311790,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9653,
            				n_title: "Procyon",
            				n_parentid: 9647,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9647,
            				n_title: "Procyonidae",
            				n_parentid: 379584,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 30600,
            				n_title: "Propithecus",
            				n_parentid: 30599,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9254,
            				n_title: "Prototheria",
            				n_parentid: 40674,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9869,
            				n_title: "Rangifer",
            				n_parentid: 9881,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9803,
            				n_title: "Rhinocerotidae",
            				n_parentid: 9787,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9845,
            				n_title: "Ruminantia",
            				n_parentid: 91561,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9520,
            				n_title: "Saimiri",
            				n_parentid: 378850,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 378850,
            				n_title: "Saimiriinae",
            				n_parentid: 9498,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 1532884,
            				n_title: "Sapajus",
            				n_parentid: 38070,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 3014,
            				n_title: "Sargassaceae",
            				n_parentid: 3009,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 314293,
            				n_title: "Simiiformes",
            				n_parentid: 376913,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9774,
            				n_title: "Sirenia",
            				n_parentid: 311790,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 376911,
            				n_title: "Strepsirrhini",
            				n_parentid: 9443,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9821,
            				n_title: "Suidae",
            				n_parentid: 35497,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 35497,
            				n_title: "Suina",
            				n_parentid: 91561,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9822,
            				n_title: "Sus",
            				n_parentid: 9821,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 325166,
            				n_title: "Symphalangus",
            				n_parentid: 9577,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9259,
            				n_title: "Tachyglossidae",
            				n_parentid: 9255,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9260,
            				n_title: "Tachyglossus",
            				n_parentid: 9259,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 32525,
            				n_title: "Theria",
            				n_parentid: 40674,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9944,
            				n_title: "Tragelaphus",
            				n_parentid: 27592,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9775,
            				n_title: "Trichechidae",
            				n_parentid: 9774,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9776,
            				n_title: "Trichechus",
            				n_parentid: 9775,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9336,
            				n_title: "Trichosurus",
            				n_parentid: 9335,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9738,
            				n_title: "Tursiops",
            				n_parentid: 9726,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9834,
            				n_title: "Tylopoda",
            				n_parentid: 91561,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9632,
            				n_title: "Ursidae",
            				n_parentid: 379584,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9639,
            				n_title: "Ursus",
            				n_parentid: 9632,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 948952,
            				n_title: "Vermilingua",
            				n_parentid: 948950,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9338,
            				n_title: "Vombatidae",
            				n_parentid: 38609,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 29138,
            				n_title: "Vombatus",
            				n_parentid: 9338,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 2653789,
            				n_title: "Whippomorpha",
            				n_parentid: 91561,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 9348,
            				n_title: "Xenarthra",
            				n_parentid: 9347,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 71274,
            				n_title: "asterids",
            				n_parentid: 1437201,
            				n_elements: this.sideElm
            			},
            			{
            				n_id: 91888,
            				n_title: "lamiids",
            				n_parentid: 71274,
            				n_elements: this.sideElm
            			}
            		]


        });
    }

    setEvents(){
        const log = document.getElementById('txt_log');
        const input = document.getElementById('in_item');
        const btnAdd = document.getElementById('btn_add');
        const btnGtSlctd = document.getElementById('btn_getSelected');
        btnAdd.addEventListener('click',e=>{
            if(input.value.trim()===''){
                input.classList.add('is-invalid');
            }else{
                const id = (new Date()).getTime();
                this.tree.createNode({
                    n_value: id,
                    n_title: input.value,
                    n_id: id,
                    n_elements : this.sideElm,
                    n_parent: {id:0},
                    n_checkStatus: false
                });
            }
            input.value = '';
        });

        btnGtSlctd.addEventListener('click',e=>{
          let arr = this.tree.getSelected();
          for (let i = 0; i < arr.length; i++) {
            log.value += 'checked:' + arr[i].value + ', ' + arr[i].title +'\n';
            log.scrollTop = log.scrollHeight;
          }

        });
        input.addEventListener('keydown',e=>{
            if ( e.keyCode == 13 ) {
                button.click();
            }
        });




    }
}
