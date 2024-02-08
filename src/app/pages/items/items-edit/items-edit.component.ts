import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';
import { DosesService } from 'src/app/services/doses.service';
import { ItemsService } from 'src/app/services/items.service';
import { ItemunitsService } from 'src/app/services/itemunits.service';
import { PractitionercategoriesService } from 'src/app/services/practitionercategories.service';
import { SubcategoriesService } from 'src/app/services/subcategories.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-items-edit',
  templateUrl: './items-edit.component.html',
  styleUrls: ['./items-edit.component.css'],
})
export class ItemsEditComponent {
  itemslistUrl = '/' + environment.itemsList;

  itemDose:any
  dsmactlist:any
  catactlist: any;
  itmCategory: any;
  Iunitlist: any;
  durtlist=[{'Name':'Day'},{'Name':'Month'},{'Name':'Year'}];
  name: any;
  subcatactlist: any;
  subcatactlistAll: any;
  subCategories: any;
  subCategoriesId = '';
  categoriesId = '';
  doseId = '';
  practitionercatlist: any;
  pratitionerCategories: any;
  pratitionerCategoriesId = '';

  adminId: any;
  itmName: any;
  itmSlug:any;
  itmSlug1:any;
  itmSeoTitle:any;
  itmSeoDesc:any;
  itmSeoKeywords:any;
  itmVDuration:any;
  itmVDurationType="Duration";
  durationMessage:any;

  unitName = 'Unit';
  itmHsnCode: any;
  itmSacCode: any;
  itmIsGst: any;
  itmIGst: any;
  itmCGst: any;
  itmSGst: any;
  itmFeatures:any;
  itmShortDesc: any;
  itmLongDesc: any;
  itmImageGallery: any=[];
  itmVideo:any;
  itmDocumentation: any;
  itmSampleReport: any;
  itmimageUrl: any;
  itmImgGallery:any
  itmIsActive: any;
  
  Id: any;
  loading = false;
  dsmloading = true;
  catloading = false;
  mes: any;
  response: any;
  itmSeoTitleMessage:any;
  itmSeoDescMessage:any;
  itmSeoKeywordsMessage:any;
  nameMessage: any;
  unitMessage: any;
  costpriceMessage: any;
  mrpMessage: any;
  igstMessage: any;
  cgstMessage: any;
  sgstMessage: any;
  catdropdownMessage: any;
  subcatdropdownMessage: any;
  pcatdropdownMessage: any;
  shortdesMessage: any;
  longDescMessage: any;
  suggestedUseMessage: any;
  factsMessage: any;
  instructionMessage: any;
  itemImageMessage: any;
  itemdocMessage: any;
  errorCount = 0;

  ImagePath = environment.cdnUrl + 'Product/';
  @Input() isoffer: any;
  @Input() Isshoweditor = true;
  @Input() Isshowlabeleditor = true;
  @Input() Isshowfileupload = true;
  @Input() Isshowlabeluploadfile = true;

  itemOtherDesc: string[][] = [];
  itemDescTitle: any;
  itemDescDetail: any;
  dsmId = '';
  catId = '';
  subId = '';
  parcatId = '';
  setPrCat: any;

  dDsm: any = [];
  cCat: any = [];
  sCat: any = [];
  pCat: any = [];
  itmIsBestSeller:any;

  constructor(
    private toastr:ToastrService,
    public unitService: ItemunitsService,
    public dosesrvice:DosesService,
    public categoryservice: CategoriesService,
    public subcategoryservice: SubcategoriesService,
    public pracategoriesService: PractitionercategoriesService,
    public itemService: ItemsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.itemService.item.itmImageGallery="";
    this.getcat(this.route.snapshot.params['id']);
  }

  isBestseller(event:any){
    if(event.target.checked == true){
      this.itmIsBestSeller = true
    }else{
      this.itmIsBestSeller =false 
    }    
  }

  //Unit onchange DropDown
  onchangeunit(id: any) {
    // this.itemService.item.unitId = id;
  }

  //Is GST checkbox hide & show
  checkbox(event: any) {
    if (event.target.checked == true) {
      this.itmIsGst = true;
    } else {
      this.itmIsGst = false;
    }
  }

  //Doses onchange DropDown
  onchangedsm(id: any) {
    this.dsmId += id + '||';

    var ds = this.dDsm.filter((c: any) => c == id);

    if (ds.length == 0) {
      this.dDsm.push(id);
    } else {
      this.dDsm.forEach((item: any, index: any) => {
        if (item == id) {
          this.dDsm.splice(index, 1);
        }
      });
    }   
  }

  //category onchange DropDown
  onchangecat(id: any) {
    this.catId += id + '||';

    var ct = this.cCat.filter((c: any) => c == id);

    if (ct.length == 0) {
      this.cCat.push(id);
    } else {
      this.cCat.forEach((item: any, index: any) => {
        if (item == id) {
          this.cCat.splice(index, 1);
        }
      });
    }
    // let catList:any=[];
    // this.sCat=[];
    // if(id=="-"){
    //   this.subcatactlist=this.subcatactlistAll;
    // }else{
    //   catList=this.subcatactlistAll.filter((a:any)=>a.categoryId==id)
    //   this.subcatactlist=catList;
    // }
    // this.itmCategory = id
    // this.subId = ""
  }

  //sub category onchange DropDown
  onchangesubcat(id: any) {
    this.subId += id + '||';

    var sc = this.sCat.filter((s: any) => s == id);
    if (sc.length == 0) {
      this.sCat.push(id);
    } else {
      this.sCat.forEach((item: any, index: any) => {
        if (item == id) {
          this.sCat.splice(index, 1);
        }
      });
    }
  }

  //practioner category onchange DropDown
  onchangeparcat(id: any) {
    this.parcatId += id + '||';

    var pd = this.pCat.filter((t: any) => t == id);

    if (pd.length == 0) {
      this.pCat.push(id);
    } else {
      this.pCat.forEach((item: any, index: any) => {
        if (item == id) {          
          this.pCat.splice(index, 1);          
        }
      });
    }
  }

  //select file event itmImageGallery
  selectedfile(pimImages: string) {
    this.itemService.item.itmImageGallery =
      this.itemService.item.itmImageGallery + pimImages;
    const itemimg = pimImages.split('||');
    this.itmimageUrl = itemimg[0];
  }

  //select file event itmDocumentation
  selectedDocumentation(documentation: string) {
    this.itemService.item.itmDocumentation = documentation;
    this.itmDocumentation = documentation;
    const itemimg = documentation.split('||');
    //this.itmimageUrl = itemimg[0];
  }

  //select file event for ItmSampleReport
  selectedReport(sampleReport: string) {
    this.itemService.item.itmSampleReport = sampleReport;
    this.itmSampleReport = sampleReport;
    const itemimg = sampleReport.split('||');
    //this.itmimageUrl = itemimg[0];
  }

  //get the list from Item unit
  private unitlist() {
    this.Iunitlist = null;
    this.unitService.listActItemunits().subscribe({
      next: (data) => {
        this.Iunitlist = data;
      },
    });
  }

  //get the list from Doses actvie
  private doseList() {
    this.dsmloading = true
    this.dsmactlist = null;
    this.dosesrvice.listActiveDoses().subscribe({
      next: (data) => {
        this.dsmactlist = data;        
        this.dsmloading = false
      },
    });
  }

  //get the list from category actvie
  private catList() {
    this.catloading = true;
    this.catactlist = null;
    this.categoryservice.listActcategories().subscribe({
      next: (data) => {
        this.catactlist = data;
        //this.setCatData();
        this.catloading = false;
      },
    });
  }

  //Set Categoty Data
  // setCatData(){
  //   var cData=this.catactlist;
  //   var cd:any=[];
  //   cData.forEach((e:any) => {
  //     if(this.itmCategory==e.id)
  //     {
  //       e.status=true;
  //       cd.push(e);
  //     }
  //     else{
  //       e.status=false;
  //       cd.push(e);
  //     }
  //   });
  //   this.catactlist=cd;
  // }

  //get the list from sub category actvie
  private subcatList() {
    this.subcatactlist = null;
    this.subcategoryservice.listActScategories().subscribe({
      next: (data) => {
        this.subcatactlist = data;
        this.subcatactlistAll = data;
        // let catList1=this.subcatactlist.filter((a:any)=>a.categoryId==this.itmCategory)
        //this.subcatactlist=catList1;
      },
    });
  }

  //get the list from practioner category actvie
  private pracatList() {
    this.practitionercatlist = null;
    this.pracategoriesService.listActpracategories().subscribe({
      next: (data) => {
        this.practitionercatlist = data;
      },
    });
  }
defaultImage:any;
  // get the record particular Items
  getcat(id: any) {
    this.Id = id;
    this.loading = true;
    this.itemService.getDetail(id).subscribe({
      next: (data: any) => {                             
        this.itmName = data.itmName;
        this.itmSlug = data.itmSlug;     
        this.itmSlug1 = data.itmSlug;        
        this.itmSeoTitle = data.itmSeoTitle;
        this.itmSeoDesc = data.itmSeoDesc;
        this.itmSeoKeywords = data.itmSeoKeywords;
        this.itmFeatures = data.itmFeatures;
        this.itmIsBestSeller =data.itmIsBestSeller
        this.itmHsnCode = data.itmHsnCode;
        this.itmSacCode = data.itmSacCode;
        this.itmIsGst = data.itmIsGst;
        this.isoffer = data.itmIsGst;
        this.itmIGst = data.itmIGst;
        this.itmCGst = data.itmCGst;
        this.itmSGst = data.itmSGst;
        this.itmType = data.itmType;
        this.itmDuration =data.itmDuration;
        this.itmVideo = data.itmVideo;
        this.itmimageUrl = this.ImagePath + data.itmImage;        
        this.defaultImage=data.itmImage;
        if(data.itmImageGallery!= null){
          this.itmImgGallery = data.itmImageGallery.split(',').filter((a:any)=>a.length>=1);
        }
        
        if(this.itmType=="Supplement")
        {
          this.type=false;
        }
        else{
          this.type=true;
        }
        this.itemDose = data.itemDose
        data.itemDose.forEach((e: any) => {
          
          this.dDsm.push(e.title);
        });
        this.itmCategory = data.itmCategory;

        data.itmCategory.forEach((e: any) => {
          this.cCat.push(e.id);
        });

        this.subCategories = data.itmSubCategories;
        data.itmSubCategories.forEach((e: any) => {
          this.sCat.push(e.id);
        });
        this.pratitionerCategories = data.itmPractitionerCategories;
        data.itmPractitionerCategories.forEach((p: any) => {
          this.pCat.push(p.id);
        });
        this.itmShortDesc = data.itmShortDesc;
        this.itmLongDesc = data.itmLongDesc;
        data.itemVariants.forEach((e: any) => {
          this.itemOthervariant.push([
            e['name'],
            e['itmQty'],
            e['unitId'],
            e['itmCostPrice'],
            e['itmMRP'],
            e['isDefault'],
            e['unitName'],
            e['itmIsOffer'],
            e['itmOfferPrice'],
            e['itmVDuration'],
            e['itmVDurationType'],
            
            
            
          ]);
        });
        data.itemDescriptions.forEach((element: any) => {
          this.itemOtherDesc.push([element['title'], element['description']]);
        });

        this.itmIsActive = data.itmIsActive;
        this.unitlist();
        this.doseList();
        this.catList();
        this.subcatList();
        this.pracatList();
        this.loading = false;
      },
    });
  }

  //post for Items Edit
  onSubmit(form: NgForm) {
    this.errorCount = 0;
    this.pratitionerCategoriesId = '';
    this.itemOtherDesc.forEach((element: any) => {
      var itm = {
        title: element[0],
        description: element[1],
      };
      this.itemDec.push(itm);
    });

    //set itm price variant

    this.itemVariant = [];

    this.itemOthervariant.forEach((ele: any) => {
      let isD = true;
      if (ele[5].toString() == 'true') {
        isD = true;
      } else {
        isD = false;
      }
      let isof = true;
      if (ele[7].toString() == 'true') {
        isof = true;
      } else {
        isof = false;
      }
      
      
      var itmv = {
        name: ele[0],
        itmQty: ele[1],
        unitId: ele[2],
        itmCostPrice: ele[3],
        itmMRP: ele[4],
        isDefault: isD,
        unitName:ele[6],
        itmIsOffer:isof,
        itmOfferPrice:ele[8],
        itmVDuration:ele[9],
        itmVDurationType:ele[10]
      };
      this.itemVariant.push(itmv);
    });

    //Name validation
    if (this.itmName == undefined) {
      this.errorCount++;
      this.nameMessage = 'Please enter name';
    } else {
      if (this.itmName.trim() == '') {
        this.errorCount++;
        this.nameMessage = 'Please enter valid name';
      } else {
        this.nameMessage = '';
      }
    }
    if(this.itmSeoTitle==undefined || this.itmSeoTitle=="")
    {
      this.itmSeoTitle=this.itmName
    }
    if(this.itmSeoDesc==undefined || this.itmSeoDesc=="")
    {
      this.itmSeoDesc=this.itmName
    }
    if(this.itmSeoKeywords==undefined || this.itmSeoKeywords=="")
    {
      this.itmSeoKeywords=this.itmName
    }
     //Meta Title validation    
     if(this.itmSeoTitle.length > 60){
      this.errorCount++;
      this.itmSeoTitleMessage = 'Only 60 character is valid!';
    }else{
      this.itmSeoTitleMessage = '';
    }
    
    //Meta Descripion validation    
    if(this.itmSeoDesc.length > 160){

      this.errorCount++;
      this.itmSeoDescMessage = 'Only 160 character is valid!';
    }else{
      this.itmSeoDescMessage = '';
    }
    //Meta Keyword validation    
    if(this.itmSeoKeywords.length > 30){

      this.errorCount++;
      this.itmSeoKeywordsMessage = 'Only 30 character is valid!';
    }else{
      this.itmSeoKeywordsMessage = '';
    }
    //Gst validation
    if (this.isoffer == true) {
      //IGst validation
      if (this.itmIGst == undefined) {
        this.errorCount++;
        this.igstMessage = 'Please enter igst';
      } else {
        this.igstMessage = '';
      }

      //CGST  validation
      if (this.itmCGst == undefined) {
        this.errorCount++;
        this.cgstMessage = 'Please enter cgst';
      } else {
        this.cgstMessage = '';
      }

      //SGST validation
      if (this.itmSGst == undefined) {
        this.errorCount++;
        this.sgstMessage = 'Please enter sgst';
      } else {
        this.sgstMessage = '';
      }
    }

    //Category dropdown validation
    if (this.itmCategory == undefined) {
      this.errorCount++;
      this.catdropdownMessage = 'Please select category';
    } else {
      this.catdropdownMessage = '';
    }

    //Sub Category dropdown validation
    if (this.sCat == '') {
      this.errorCount++;
      this.subcatdropdownMessage = 'Please select sub category';
    } else {
      this.subcatdropdownMessage = '';
    }

    //practitioner category validation
    if (this.pCat.length == 0) {
      this.errorCount++;
      this.pcatdropdownMessage = 'Please select practitioner category';
    } else {
      this.pcatdropdownMessage = '';
    }
    //Image validation
    if (this.itmimageUrl == '-') {
      this.errorCount++;
      this.itemImageMessage = 'Please enter image';
    } else {
      this.itemImageMessage = '';
    }

    //Long Description validation
    if (this.itmLongDesc == undefined) {
      this.errorCount++;
      this.longDescMessage = 'Please enter long description';
    } else {
      if (this.itmLongDesc.trim() == '') {
        this.errorCount++;
        this.longDescMessage = 'Please enter valid long description';
      } else {
        this.longDescMessage = '';
      }
    }

    //Short Descripion validation
    // if (this.itmShortDesc.length > 250) {
    //   this.errorCount++;
    //   this.shortdesMessage = 'Only 250 character is valid!';
    // } else {
    //   this.shortdesMessage = '';
    // }

    //duration validation
    // if(this.itmType == 'Elearning'){
    //   if (this.itmDuration == undefined) {
    //     this.errorCount++;
    //     this.itmDurationMessage = 'Please enter duration';
    //   } else {
    //     if (this.itmDuration.trim() == '') {
    //       this.errorCount++;
    //       this.itmDurationMessage = 'Please enter valid duration';
    //     } else {       
    //         this.itmDurationMessage = '';       
    //     }
    //   }  
    // }

    if (this.errorCount == 0) {
      if (this.itmHsnCode == undefined) {
        this.itemService.item.itmHsnCode = '-';
      } else {
        this.itemService.item.itmHsnCode = this.itmHsnCode;
      }

      if (this.itmSacCode == undefined) {
        this.itemService.item.itmSacCode = '-';
      } else {
        this.itemService.item.itmSacCode = this.itmSacCode;
      }

      if (this.itmFeatures == undefined) {
        this.itemService.item.itmFeatures = '-';
      } else {
        this.itemService.item.itmFeatures = this.itmFeatures;
      }

      

      if (this.itmIsGst == undefined) {
        this.itmIsGst = false;
      }
      if (this.itmIsGst == undefined) {
        this.itemService.item.itmIGst = '-';
        this.itemService.item.itmCGst = '-';
        this.itemService.item.itmSGst = '-';
      } else {
        this.itemService.item.itmIGst = this.itmIGst;
        this.itemService.item.itmCGst = this.itmCGst;
        this.itemService.item.itmSGst = this.itmSGst;
      }

      if (this.itmShortDesc == undefined || this.itmShortDesc == null) {
        this.itemService.item.itmShortDesc = '-';
      } else {
        this.itemService.item.itmShortDesc = this.itmShortDesc;
      }
      if (this.itmDocumentation == undefined || this.itmDocumentation == null) {
        this.itemService.item.itmDocumentation = '-';
      } else {
        this.itemService.item.itmDocumentation = this.itmDocumentation;
      }
      if (this.itmSampleReport == undefined || this.itmSampleReport == null) {
        this.itemService.item.itmSampleReport = '-';
      } else {
        this.itemService.item.itmSampleReport = this.itmSampleReport;
      }     
            
      if(this.itmVideo == undefined || this.itmVideo == null){
        this.itemService.item.itmVideo = "-"
       
      }else{
        this.itemService.item.itmVideo = this.itmVideo        
      }           
     
      this.itemService.item.id = this.Id;
      this.adminId = localStorage.getItem('userId');
      this.itemService.item.adminId = this.adminId;
      this.itemService.item.itmName = this.itmName;
      
      if(this.itmSlug == '' ||this.itmSlug == null ||this.itmSlug == undefined){        
        this.itemService.item.itmSlug = this.itmSlug1;
      }else{
        this.itemService.item.itmSlug = this.itmSlug;
      }
            
      if(this.itmSeoTitle == undefined){
        this.itemService.item.itmSeoTitle = this.itmName;
      }else{
        this.itemService.item.itmSeoTitle = this.itmSeoTitle;
      }

      if(this.itmSeoDesc == undefined){
        this.itemService.item.itmSeoDesc = this.itmName;
      }else{
        this.itemService.item.itmSeoDesc = this.itmSeoDesc;
      }

      if(this.itmSeoKeywords == undefined){
        this.itemService.item.itmSeoKeywords = this.itmName;
      }else{
        this.itemService.item.itmSeoKeywords = this.itmSeoKeywords;
      }
      this.itemService.item.itmIsGst = this.itmIsGst;
      this.itemService.item.itmIsBestSeller = this.itmIsBestSeller;

      this.itemService.item.itemDescriptions = this.itemDec;
      this.itemService.item.itemVariants = this.itemVariant;

      //set Dose data
      this.dDsm.forEach((ds: any) => {
        if (ds != undefined) {
          this.doseId += ds + '||';
          this.itemService.item.itemDose = this.doseId;
        }
      });

      //set Categories data
      this.cCat.forEach((c: any) => {
        if (c != undefined) {
          this.categoriesId += c + '||';
          this.itemService.item.itmCategory = this.categoriesId;
        }
      });

      //set subCategories data
      this.sCat.forEach((a: any) => {
        if (a != undefined) {
          this.subCategoriesId += a + '||';
          this.itemService.item.subCategories = this.subCategoriesId;
        }
      });
      //set pratitionerCategories data
      this.pCat.forEach((p: any) => {
        if (p != undefined) {
          this.pratitionerCategoriesId += p + '||';
          this.itemService.item.pratitionerCategories =
            this.pratitionerCategoriesId;
        }
      });

      this.itemService.item.itmLongDesc = this.itmLongDesc;
      this.itemService.item.itmIsActive = this.itmIsActive;
      if (this.itmimageUrl == '' || this.itmimageUrl == undefined) {
        this.itemService.item.itmImageGallery = '-';
      }
      this.itemService.item.itmType =this.itmType;
      if(this.itmDuration == undefined){
        this.itemService.item.itmDuration = "-";
      }else{
        this.itemService.item.itmDuration =this.itmDuration;
      }

      //loading condition start
      if (this.loading == false) {
        this.loading = true;

        //start Items edit service
        this.itemService.editItems().subscribe((res: any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.itemService.item.itmName = '';      
            if(this.itmType=="Supplement")      
            {
              this.router.navigate([environment.itemsList]);
            }
            else{
              this.router.navigate([environment.courseList]);
            }
            
          }
        });
      }
    }
  }

  //Set Dose id
  setDsmID(id: any) {
    var ds = this.itemDose.find((a: any) => a.title == id);
    if (ds != undefined) {
      return true;
    }
    return false;
  }

  //Set Categories id
  setCatID(id: any) {
    var c = this.itmCategory.find((a: any) => a.id == id);
    if (c != undefined) {
      return true;
    }
    return false;
  }

  //Set Sub Categories id
  setSubcatID(id: any) {
    var s = this.subCategories.find((a: any) => a.id == id);
    if (s != undefined) {
      return true;
    }
    return false;
  }

  //Set pratitionerCategories id
  setPracatID(id: any) {
    var p = this.pratitionerCategories.find((a: any) => a.id == id);
    if (p != undefined) {
      return true;
    }
    return false;
  }
  /************************************************* item Price Create Start****************************************************** */
  itmvName: any;
  itmVQty: any;
  itmVunitId: any;
  itmVCostPrice: any;
  itmVMRP: any;
  itmOfferPrice:any;
  itmisDefault = true;
  itmIsOffer=false;
  vnameMessage: any;
  vcostpriceMessage: any;
  vmrpMessage: any;
  vOfferMessage:any;
  itemOthervariant: string[][] = [];
  itemVariant: any = [];
  display = 'none';
  opacity = '0';
  indexs = -1;
  isCreate = true;

  //Unit onchange DropDown
  onchangeVunit(id: any, name: any) {
    this.unitName = name;
    this.itmVunitId = id;
  }

  //Duration onchange DropDown
  onchangeDur(name:any){
    this.itmVDurationType=name;    
  }

  //open model pop
  openModalDialog() {
    this.itmIsOffer=false
    this.display = 'block'; //Set block css
  }

  //close model pop
  closeModalDialog() {
    this.display = 'none'; //set none css after close dialog
    this.opacity = '0';
    this.itmvName = '';
    this.itmVCostPrice = '';
    this.itmVMRP = '';
    this.itmVQty = '';
    this.itmVunitId = '';
    this.unitName = 'Unit';
    this.itmisDefault = true;
    this.durationMessage="";
    this.itmVDuration="";
    this.itmVDurationType="Duration";
    this.itmOfferPrice = '';
    this.indexs = -1;
  }

  //Set default checked Box
  isDefault($event: any) {
    if ($event.target.checked == true) {
      this.itmisDefault = true;
    } else {
      this.itmisDefault = false;
    }
  }

  //Set Is Offer checked Box
  isOffer($event:any){
    if($event.target.checked==true){      
      this.itmIsOffer=true;            
    }
    else{      
      this.itmIsOffer=false;      
    }
  }

  //item price
  addVariant() {
    this.errorCount = 0;

    //Name validation
    if (this.itmvName == undefined) {
      this.errorCount++;
      this.vnameMessage = 'Please enter name';
    } else {
      if (this.itmvName.trim() == '') {
        this.errorCount++;
        this.vnameMessage = 'Please enter valid name';
      } else {
        this.vnameMessage = '';
      }
    }
     //Duration  validation
   if(this.itmType=="Elearning"){
    if (this.itmVDuration == undefined || this.itmVDuration == "") {
      this.errorCount++;
      this.durationMessage = 'Please enter duration';
    } else {
       if(this.itmVDurationType == "Duration" || this.itmVDurationType == undefined || this.itmVDurationType == "") {
         this.errorCount++;
         this.durationMessage = 'Please select duration type';
       } else{
         this.durationMessage = '';
       }
     }
   }

    //Quantity  validation
    if (this.itmVQty == undefined) {
      this.errorCount++;
      this.unitMessage = 'Please enter quantity';
    } else {
      if (        
        this.itmVunitId == 'Unit' ||
        this.itmVunitId == undefined ||
        this.itmVunitId == ''
      ) {
        this.errorCount++;
        this.unitMessage = 'Please select quantity unit';
      } else {
        this.unitMessage = '';
      }
    }

    //Cost Price validation
    if (this.itmVCostPrice == undefined) {
      this.errorCount++;
      this.vcostpriceMessage = 'Please enter cost price';
    } else {
      this.vcostpriceMessage = '';
    }

    //MRP Price validation
    if (this.itmVMRP == undefined) {
      this.errorCount++;
      this.vmrpMessage = 'Please enter mrp';
    } else {
      this.vmrpMessage = '';
    }
    //Offer Price validation
   if(this.itmIsOffer==true)
   {
    if (this.itmOfferPrice == undefined) {
      this.errorCount++;
      this.vOfferMessage = 'Please enter offer price';
    } else {
      this.vOfferMessage = '';
    }     
   }
    var titleExist = this.itemOthervariant.filter((a:any)=>a[0].toLowerCase() == this.itmvName.toLowerCase())    
    if(titleExist.length>=1)
    {
     this.itemOthervariant.forEach((element:any,index) => {      
       if(this.itmvName == element[0])
       {
         if(this.indexs!=index)
         {
           this.errorCount++;
           this.vnameMessage = 'Variant name is already exist';
         }
       }
     });
    }
    else{
      this.vnameMessage = '';
    }
    if (this.errorCount == 0) {
     
      if (this.indexs == -1) {
        if (this.itmisDefault == true) {
          this.itemOthervariant.forEach((element: any, index) => {
              this.itemOthervariant[index][5] = 'false';
          });
        }

        // if (this.itmIsOffer == true) {
        //   this.itemOthervariant.forEach((element: any, index) => {
        //       this.itemOthervariant[index][7] = 'false';
        //   });
        // }
        if(this.itmIsOffer == false){
          this.itmOfferPrice = this.itmVMRP
        }
        this.itemOthervariant.push([
          this.itmvName,
          this.itmVQty,
          this.itmVunitId,
          this.itmVCostPrice,
          this.itmVMRP,
          this.itmisDefault,
          this.unitName,
          this.itmIsOffer,
          this.itmOfferPrice,
          this.itmVDuration,
          this.itmVDurationType,
        ]);
        var itmv = {
          name: this.itmvName,
          itmCostPrice: this.itmVCostPrice,
          itmMRP: this.itmVMRP,
          itmQty: this.itmVQty,
          unitId: this.itmVunitId,
          isDefault: this.itmisDefault,
          unitName:this.unitName,
          itmIsOffer:this.itmIsOffer,
          itmOfferPrice:this.itmOfferPrice,
          itmVDuration:this.itmVDuration,
          itmVDurationType:this.itmVDurationType,          
          
        };
        this.itemVariant.push(itmv);
      } else {
        if (this.itmisDefault == true) {
          this.itemOthervariant.forEach((element: any, index) => {
            this.itemOthervariant[index][5] = 'false';
          });
        }
        // if (this.itmIsOffer == true) {
        //   this.itemOthervariant.forEach((element: any, index) => {
        //     this.itemOthervariant[index][7] = 'false';
        //   });
        // }
        
      
        this.itemOthervariant[this.indexs][0] = this.itmvName;
        this.itemOthervariant[this.indexs][1] = this.itmVQty;
        this.itemOthervariant[this.indexs][2] = this.itmVunitId;
        this.itemOthervariant[this.indexs][3] = this.itmVCostPrice;
        this.itemOthervariant[this.indexs][4] = this.itmVMRP;
        this.itemOthervariant[this.indexs][5] = this.itmisDefault.toString();
        this.itemOthervariant[this.indexs][6] = this.unitName;
        this.itemOthervariant[this.indexs][7] = this.itmIsOffer.toString();
        if(this.itmIsOffer == false){
          this.itemOthervariant[this.indexs][8] = this.itmVMRP;        
        }
        else{
          this.itemOthervariant[this.indexs][8] = this.itmOfferPrice;        
        }
        this.itemOthervariant[this.indexs][9]=this.itmVDuration;
        this.itemOthervariant[this.indexs][10]=this.itmVDurationType;  
        this.indexs = -1;
      }
      this.closeModalDialog();
      this.itmvName = '';
      this.itmVCostPrice = '';
      this.itmVMRP = '';
      this.itmVQty = '';
      this.itmVunitId = '';
      this.itmOfferPrice = '';
      this.itmIsOffer = false
      this.itmVDuration="";
      this.itmVDurationType="";
    }
  }

  //Edit item decription
  editVariant(pv: any) {
    var unitData = this.Iunitlist.find(
      (t: any) => t.id == this.itemOthervariant[pv][2]
    );
    if (unitData.length != 0) {
      this.unitName = unitData.name;
    }

    this.openModalDialog();
    this.indexs = pv;
    this.itmvName = this.itemOthervariant[pv][0];
    this.itmVQty = this.itemOthervariant[pv][1];
    this.itmVunitId = this.itemOthervariant[pv][2];
    this.itmVCostPrice = this.itemOthervariant[pv][3];
    this.itmVMRP = this.itemOthervariant[pv][4];
    //this.itmisDefault= Boolean(this.itemOthervariant[pv][5])
    this.unitName = this.itemOthervariant[pv][6];
    this.itmOfferPrice = this.itemOthervariant[pv][8];
    this.itmVDuration=this.itemOthervariant[pv][9]       
    this.itmVDurationType=this.itemOthervariant[pv][10]   
    
    var v1=this.itemOthervariant[pv][5].toString();
    if (v1 == 'false') {
      this.itmisDefault = false;
    } else {
      this.itmisDefault = true;
    }

    var v2=this.itemOthervariant[pv][7].toString();    
    if (v2 == 'false') {
      this.itmIsOffer = false;
    } else {
      this.itmIsOffer = true;
    }
    
  }

  deleteTitlev: any;
  deleteIdv = -1;
  editVariant1(pv: any) {
    this.deleteTitlev = this.itemOthervariant[pv][0];
    this.deleteIdv = pv;
  }

  //Delete item decription
  deleteVariant() {
    this.itemOthervariant.splice(this.deleteIdv, 1);
    this.deleteIdv = -1;
  }
/************************************************* item Price Create End****************************************************** */

/*************************************************Group assign variant Start****************************************************** */

  dis= 'none';
  opa = '0';
  groupVariantlist:any;
  dispar:any=[];
  disparamount:any=[];
  disparprice:any=[];
  setvalue:any=[];
  discountResponse="";
  infoClass="success";
  isDiscountResponse=false;
  discloading = false;

  //model pop up open
  openDialog() {
    this.dis = 'block'; //Set block css
  }

  //model pop up open
  closeDialog() {
    this.dis = 'none'; //set none css after close dialog
    this.opa = '0';
   
  }

  //group assign variant get
  groupVariant(pv: any) {  
    this.discloading = true;
    this.isDiscountResponse=false;  
    this.discountResponse="";
    this.dispar=[];
    this.disparamount=[];
    this.disparprice=[];
    
    this.openDialog();
    this.itmvName = this.itemOthervariant[pv][0];
    this.itemService.getGroupVariant(this.Id,this.itmvName).subscribe({
      next: (data: any) => {
        this.groupVariantlist=data        
        data.forEach((e:any,i:any) => {
          this.dispar[i]= e.itmPDiscount
          this.disparamount[i] = e.itmPDiscountAmount
          this.disparprice[i]=e.itmPPrice
        });
        this.discloading = false;
      }
    });
  }

  //set Discount Value
  setDis1(event:any,i:any,a:any){
    this.dispar[i]=event.target.value;
    this.setvalue[i]=this.dispar[i]
    this.disparamount[i] = this.dispar[i]*a/100
    this.disparprice[i] =a-this.disparamount[i]
  }

  //set amount to discount value
  setDis2(event:any,i:any,a:any){
    
    this.disparamount[i]=event.target.value;  
    var dis = this.disparamount[i]*100/a;
    this.dispar[i] =dis.toString();
    
    this.setvalue[i]=this.dispar[i]
    this.disparprice[i] =a-this.disparamount[i]   
   }

  //group assign variant post
  saveGroupDiscount(ind:any,itm:any){
    this.discountResponse="";
    this.isDiscountResponse=false;
    itm.itmPDiscount=this.dispar[ind];
    itm.itmPDiscountAmount=this.disparamount[ind].toString();
    itm.itmPPrice=this.disparprice[ind].toString();    
    this.discloading = true
    
    //start Items group variant edit service
    this.itemService.updateGroupVariant(itm).subscribe((res: any) => {
      if(res=="Success"){
        this.infoClass="success";
        this.discountResponse = "Group discount updated";
        this.discloading = false
      }else{
        this.infoClass="danger";
        this.discountResponse = res;
        this.discloading = false
      }
      this.isDiscountResponse=true;
    });
  }

  //alert box close
  discountAlertbox(){
    this.isDiscountResponse=false;
  }

/*************************************************Group assign variant End****************************************************** */
  

/************************************************* item decription Start****************************************************** */
  //item decription
  index = -1;
  itemDec: any = [];

  addhtml() {
    var dTitle = this.itemDescTitle;
    var dDetail = this.itemDescDetail;
    if (this.index == -1) {
      this.itemOtherDesc.push([dTitle, dDetail]);
    } else {
      this.itemOtherDesc[this.index][0] = dTitle;
      this.itemOtherDesc[this.index][1] = dDetail;
      this.index = -1;
    }
    this.itemDescTitle = '';
    this.itemDescDetail = '';
  }

  //Edit item decription
  edithtml(dec: any) {
    this.index = dec;
    this.itemDescTitle = this.itemOtherDesc[dec][0];
    this.itemDescDetail = this.itemOtherDesc[dec][1];
  }

  deleteTitle: any;
  deleteId = -1;
  edithtml1(dec: any) {    
    this.deleteTitle = this.itemOtherDesc[dec][0];    
    this.deleteId = dec;
  }

  //Delete item decription
  deletehtml() {    
    this.itemOtherDesc.splice(this.deleteId, 1);
    this.deleteId = -1;
  }
/************************************************* item decription End****************************************************** */


/************************************************Start Multi Image Delete****************************************************** */

//delete the Items data 
deleteImage(item: any) {  
  
  let itemImages:any=[];
  itemImages=this.itmImgGallery;
  itemImages.forEach((element:any,index:any) => {
    if(element==item)
    {      
      itemImages.splice(index,1)
    }
  });
  this.itmImgGallery=itemImages
  
  this.itemService.deleteImage(this.Id,item).subscribe({
    next: (res) => {   
      if (res != 'Success') {
        this.mes = res;
        
      } else {    
        this.itmImgGallery=itemImages             
        this.toastr.success("Image was deleted successfully")
        //window.history.replaceState({}, '',`${this.route.snapshot.params['id']}`);
        //this.getcat(this.route.snapshot.params['id']);      
      }
    },      
  });
}
/************************************************End Multi Image Delete****************************************************** */

/************************************************Start Set Default Image ****************************************************** */

 //delete the Items data 
 defaultImageSet(item: any) {       
  this.itemService.setDefaultImage(this.Id,item).subscribe({
    next: (res) => {   
      if (res != 'Success') {
        this.mes = res;        
      } else {                       
        this.toastr.success("Default Image was set successfully")
        //window.history.replaceState({}, '',`${this.route.snapshot.params['id']}`);
        //this.getcat(this.route.snapshot.params['id']);      
      }
    },      
  });
}
/************************************************End Set Default Image****************************************************** */
/************************************************* radio button Start****************************************************** */  
itmDurationMessage:any
itmDuration:any;
itmType='Supplement'
type=false

selectedbtn(event:any){    
  if(event.target.value=='Supplement'){      
    this.type = false
    this.itmType =event.target.value
  }else{
    this.type = true
    this.itmType =event.target.value
  }

}

/************************************************* radio button End****************************************************** */
}
