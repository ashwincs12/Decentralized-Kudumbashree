// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DK
{
    struct Member{
        address memaddress;
        string name;
        uint aadhaar;
        string desig;
        uint balance;
        uint loan;
    }

    struct SHG {
        string name;
        string applicant;
        string location;
        address applicant_address;
    }

    SHG[] public approvedSHGs;
    SHG[] public pendingSHGs;
    Member[] public members;

    mapping(address=>SHG) public memberToSHG;
    mapping(uint=>Member[]) public SHGToMember;

    address cdsadmin;

    constructor()
    {
        cdsadmin=msg.sender;
    }

    function createSHG(string memory _name,string memory _applicant,string memory _location) public{
        pendingSHGs.push(SHG(_name,_applicant,_location,msg.sender));
    }

    function approveSHG(uint index) public 
    {
        require(index < pendingSHGs.length, "Invalid index");
        approvedSHGs.push(pendingSHGs[index]);
        if (index != pendingSHGs.length - 1) {
            pendingSHGs[index] = pendingSHGs[pendingSHGs.length - 1];
        }
        pendingSHGs.pop();
    }

    struct Notification{
        string title;
        string desc;
        string link;
    }

    Notification[] public n;

    function createNotification(string memory _title,string memory _desc,string memory _link) public 
    {
       require(msg.sender==cdsadmin,"Only CDS Admin can create notification!"); 
       n.push(Notification(_title,_desc,_link));
    }

    function cdsdash() view public returns(uint,uint,uint)
    {
        require(msg.sender==cdsadmin);
        return(approvedSHGs.length,members.length,pendingSHGs.length);
    }

    function memRegandJoin(string memory _name,uint _aadhar,uint SHGindex) public 
    {
        for (uint i = 0; i < members.length; i++) {
            require(members[i].memaddress != msg.sender, "Member already registered");
        }

        memberToSHG[msg.sender] = approvedSHGs[SHGindex];
        string memory _desig;
        if (msg.sender == approvedSHGs[SHGindex].applicant_address) {
            _desig = "President";
        } else {
            _desig = "Member";
        }

        Member memory _m = Member(msg.sender, _name, _aadhar, _desig, 0, 0);
        members.push(_m);

        SHGToMember[SHGindex].push(_m);
    }

    function weeklyPay() payable public {
        require(msg.value > 0, "No value sent");

        for(uint i = 0; i < members.length; i++) {
            if (members[i].memaddress == msg.sender) {
                members[i].balance += msg.value;
                break; 
            }
        }
    }

    function loanPay() payable public{
        require(msg.value > 0, "No value sent");

        for(uint i = 0; i < members.length; i++) {
            if (members[i].memaddress == msg.sender) {
                members[i].loan -= msg.value;
                break; 
            }
        }
    }

    

    // struct Meet{
    //     bool isSet;
    //     string time; 
    //     string link;
    // }

}