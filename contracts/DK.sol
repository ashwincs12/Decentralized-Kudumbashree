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

   // Mapping from member address to SHG index
    mapping(address => uint) public memberToSHGIndex;
    // Mapping from SHG index to an array of its members
    mapping(uint => Member[]) public SHGToMember;

    address cdsadmin;

    constructor()
    {
        cdsadmin=msg.sender;
    }

    function createSHG(string memory _name,string memory _applicant,string memory _location) public{
        pendingSHGs.push(SHG(_name,_applicant,_location,msg.sender));
    }

    function getPendingSHGs() public view returns (SHG[] memory) {
        return pendingSHGs;
    }

    function getApprovedSHGs() public view returns (SHG[] memory) {
        return approvedSHGs;
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

    function getNotifications() public view returns (Notification[] memory) {
        return n;
    }

    function cdsdash() view public returns(uint,uint,uint)
    {
        require(msg.sender==cdsadmin,"Invalid authorization, Only CDS Admin can access this dashboard!!!");
        return(approvedSHGs.length,members.length,pendingSHGs.length);
    }

    function memRegandJoin(string memory _name, uint _aadhar, uint SHGindex) public {
        for (uint i = 0; i < members.length; i++) {
            require(members[i].memaddress != msg.sender, "Member already registered");
        }

        require(SHGindex < approvedSHGs.length, "Invalid SHG index");
        memberToSHGIndex[msg.sender] = SHGindex;
        string memory _desig;
        if (msg.sender == approvedSHGs[SHGindex].applicant_address) {
            _desig = "President";
        } else {
            _desig = "Member";
        }

        Member memory newMember = Member(msg.sender, _name, _aadhar, _desig, 0, 0);
        members.push(newMember);
        SHGToMember[SHGindex].push(newMember);
    }


     function memdash() public view returns (uint,uint,uint) {
        uint callerBalance = 0;
        uint callerLoan = 0;
        uint SHGTotalBalance = 0;
        bool isMember = false;
        uint memberSHGIndex = 0;

        for (uint i = 0; i < members.length; i++) {
            if (members[i].memaddress == msg.sender) {
                isMember = true;
                callerBalance = members[i].balance;
                callerLoan = members[i].loan;
                memberSHGIndex = memberToSHGIndex[msg.sender];
                break;
            }
        }
        require(isMember, "Caller is not a registered member");
        Member[] memory SHGMembers = SHGToMember[memberSHGIndex];
        for (uint j = 0; j < SHGMembers.length; j++) {
            SHGTotalBalance += SHGMembers[j].balance;
        }
        return (callerBalance, callerLoan, SHGTotalBalance);
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

